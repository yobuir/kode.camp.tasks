const async = require('async');
const fs = require('fs');
const path = require('path');
const { Readable, Writable, pipeline } = require('stream');


const numbers = [1, 3, 5, 6, 3];

function processItem(item, callback) {
  setTimeout(() => {
    const result = item * 2;
    console.log(`Processed ${item} => Result: ${result}`);
    callback(null, result);
  }, 1000);
}




async.mapSeries(numbers, processItem, (err, results) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('All items processed:', results);
  }
});







// Define source and destination directories
const sourceDirectory = './source';
const destinationDirectory = './backup';

// Create destination directory if it doesn't exist
if (!fs.existsSync(destinationDirectory)) {
  fs.mkdirSync(destinationDirectory, { recursive: true });
}

// Function to copy a file
function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    const sourceStream = fs.createReadStream(source);
    const destinationStream = fs.createWriteStream(destination);

    pipeline(sourceStream, destinationStream, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Function to copy a directory recursively
async function copyDirectory(source, destination) {
  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      fs.mkdirSync(destinationPath);
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await copyFile(sourcePath, destinationPath);
    }
  }
}

// Perform the backup
async function performBackup() {
  try {
    await copyDirectory(sourceDirectory, destinationDirectory);
    console.log('Backup completed successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the backup
performBackup();

