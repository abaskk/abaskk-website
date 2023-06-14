#!/bin/bash

# Change to the frontend directory
cd frontend

# Run npm run build
npm run build

# Move the resulting dist directory one level up
mv dist ..

# Go back to the original directory
cd ..
