// Calculate the sum of digits using an arrow function and reduce()
const calculateSum = numStr =>
    [...numStr]
      .filter(ch => !isNaN(ch) && ch.trim() !== '')
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0);
  
  // Reverse non-skipped characters while preserving every N-th (1-indexed) character
  const selectiveReverse = (str, skipInterval) => {
    const arr = [...str];
    // Build a set of indices (0-indexed) that should remain unchanged
    const skipSet = new Set(
      arr.map((_, i) => ((i + 1) % skipInterval === 0 ? i : -1)).filter(i => i !== -1)
    );
    // Extract characters that are not in the skip set
    const toReverse = arr.filter((_, i) => !skipSet.has(i));
    // Reverse the extracted characters
    const reversed = [...toReverse].reverse();
    // Rebuild the string using map(): if index is skipped, use original; otherwise use next reversed character
    return arr.map((char, i) => (skipSet.has(i) ? char : reversed.shift())).join('');
  };
  
  // Listen for form submission
  document.getElementById('transformForm').addEventListener('submit', event => {
    event.preventDefault();
  
    const inputString = document.getElementById('inputString').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const manualSkip = document.getElementById('skipInterval').value;
  
    // Determine skip interval:
    // Use manual skip interval if provided; otherwise calculate from roll number.
    let skipInterval = manualSkip ? parseInt(manualSkip, 10) : calculateSum(rollNumber);
    if (skipInterval <= 0) skipInterval = 1;
  
    // Edge case: If skipInterval is greater than the string length,
    // adjust so that no character meets the "every N-th" condition.
    if (skipInterval > inputString.length) {
      skipInterval = inputString.length + 1;
    }
  
    const transformedString = selectiveReverse(inputString, skipInterval);
  
    // Dynamically add the result to the list using DOM manipulation
    const li = document.createElement('li');
    li.textContent = `Original: "${inputString}" | Transformed: "${transformedString}" | Skip Interval: ${skipInterval}`;
    document.getElementById('resultList').appendChild(li);
  });
  