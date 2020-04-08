const fs = require('fs');
const path = require('path');
const process = require('process');

const projectPath = '/Users/mariodandrea/Documents/Code/graphQL/graphql-basics';

function fileLoop(projectPath) {
  fs.readdir(projectPath, (err, files) => {
    if (err) {
      console.error('Could not list the directory.', err);
      process.exit(1);
    }

    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      let filePath = path.join(projectPath, files[i]);

      fs.stat(filePath, (error, stat) => {
        if (error) {
          console.log(error);
          return;
        }

        if (stat.isFile()) {
          // console.log('one file here');
          fs.readFile(filePath, (error, data) => {
            if (error) {
              console.log(error);
              return;
            }

            if (data.includes('GraphQLServer')) {
              console.log(filePath);
            }
          });
        } else {
          fileLoop(filePath);
        }
      });
    }
  });
}

fileLoop(projectPath);
