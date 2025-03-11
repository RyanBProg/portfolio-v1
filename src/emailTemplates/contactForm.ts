export const contactEmail = (name: string, email: string, message: string) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .header {
              background-color: #e11d48;
              color: white;
              padding: 20px;
              border-radius: 4px 4px 0 0;
            }
            .content {
              padding: 20px;
              background-color: #f9fafb;
              border: 1px solid #e5e7eb;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: bold;
              color: #374151;
            }
            .field-value {
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${email}</div>
              </div>
              <div class="field">
                <div class="field-label">Message:</div>
                <div class="field-value">${message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};
