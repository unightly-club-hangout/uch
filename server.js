const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve the status_data.json file
app.get('/status_data.json', async (req, res) => {
  try {
    const data = await fs.readFile('status_data.json', 'utf8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    console.error('Error reading status_data.json:', error);
    res.status(500).send({ error: 'Failed to load status data' });
  }
});

// Handle the update status request
app.post('/update-status', async (req, res) => {
  const { service, status, description } = req.body;

  try {
    // 1. Read the status_data.json file
    const data = await fs.readFile('status_data.json', 'utf8');
    const statusData = JSON.parse(data);

    // 2. Find the service to update
    const serviceIndex = statusData.findIndex(item => item.service === service);
    if (serviceIndex === -1) {
      return res.status(404).send({ error: 'Service not found' });
    }

    // 3. Update the status and description
    statusData[serviceIndex].status = status;
    statusData[serviceIndex].description = description;

    // 4. Write the updated data back to the file
    await fs.writeFile('status_data.json', JSON.stringify(statusData, null, 2)); // Use null, 2 for pretty printing

    console.log(`Status updated for ${service} to ${status}`);
    res.send({ message: 'Status updated successfully' });

  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).send({ error: 'Failed to update status' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});