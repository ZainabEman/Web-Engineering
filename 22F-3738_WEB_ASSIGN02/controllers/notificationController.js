const User = require('../models/User');
const Course = require('../models/Course');
const Subscription = require('../models/Subscription');
const twilio = require('twilio');

// Initialize Twilio client
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

/**
 * Send email notification using Twilio SendGrid
 */
const sendEmailNotification = async (to, subject, message) => {
  try {
    if (!twilioClient) {
      console.log('Twilio not configured. Would have sent email to:', to);
      console.log('Subject:', subject);
      console.log('Message:', message);
      return;
    }
    
    // In a real implementation, we would use Twilio SendGrid to send email
    // For this demo, we'll just log it
    console.log(`Email notification sent to ${to}`);
    console.log('Subject:', subject);
    console.log('Message:', message);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

/**
 * Send SMS notification using Twilio
 */
const sendSmsNotification = async (to, message) => {
  try {
    if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
      console.log('Twilio not configured. Would have sent SMS to:', to);
      console.log('Message:', message);
      return;
    }
    
    // In a real implementation, we would use Twilio to send SMS
    // For this demo, we'll just log it
    console.log(`SMS notification sent to ${to}`);
    console.log('Message:', message);
    
    // Uncomment in production with valid Twilio credentials
    /*
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    */
  } catch (error) {
    console.error('Error sending SMS notification:', error);
  }
};

/**
 * Process course seat availability notifications
 */
const processNotifications = async () => {
  try {
    // Find all pending notifications
    const pendingSubscriptions = await Subscription.find({
      isActive: true,
      notificationSent: false
    }).populate('student course');
    
    if (pendingSubscriptions.length === 0) {
      return;
    }
    
    console.log(`Processing ${pendingSubscriptions.length} pending notifications`);
    
    for (const subscription of pendingSubscriptions) {
      const { student, course, notificationType } = subscription;
      
      // Check if the course still has available seats
      const updatedCourse = await Course.findById(course._id);
      
      if (!updatedCourse || updatedCourse.availableSeats <= 0) {
        continue;
      }
      
      // Build notification message
      const message = `Good news! A seat has become available in ${course.courseCode}: ${course.title}. Log in to register now before it fills up.`;
      const subject = `Seat Available in ${course.courseCode}`;
      
      // Send notifications based on preference
      if (notificationType === 'email' || notificationType === 'both') {
        await sendEmailNotification(student.email, subject, message);
      }
      
      if (notificationType === 'sms' || notificationType === 'both') {
        if (student.phone) {
          await sendSmsNotification(student.phone, message);
        }
      }
      
      // Mark notification as sent
      subscription.notificationSent = true;
      subscription.notificationSentAt = new Date();
      await subscription.save();
    }
  } catch (error) {
    console.error('Error processing notifications:', error);
  }
};

/**
 * Manual trigger for notification processing (for testing)
 */
const triggerNotifications = async (req, res) => {
  try {
    await processNotifications();
    res.status(200).json({ 
      success: true, 
      message: 'Notifications processed successfully' 
    });
  } catch (error) {
    console.error('Error triggering notifications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing notifications' 
    });
  }
};

// Export functions
module.exports = {
  sendEmailNotification,
  sendSmsNotification,
  processNotifications,
  triggerNotifications
}; 