<h1>Finance Dashboard Backend</h1>

<p>
GitHub Repository: 
<a href="https://github.com/infinitepush/Finance-Dashboard-Backend">View Project</a>
</p>

<p>
🌐 <strong>Live API:</strong><br>
<a href="https://finance-dashboard-backend-ns29.onrender.com">
https://finance-dashboard-backend-ns29.onrender.com
</a>
</p>

<p>
🩺 <strong>Health Check:</strong><br>
<a href="https://finance-dashboard-backend-ns29.onrender.com/health">
https://finance-dashboard-backend-ns29.onrender.com/health
</a>
</p>

<hr/>

<h2>🚀 Project Overview</h2>
<p>
This project is a backend service for a finance dashboard built with Node.js, Express, and MongoDB Atlas.
It provides secure APIs for user management, financial record management, and dashboard analytics with role-based access control.
</p>

<h2>✨ Features</h2>
<ul>
<li>User and role management (admin, analyst, viewer)</li>
<li>User status management (active, inactive)</li>
<li>JWT-based authentication</li>
<li>Middleware-based RBAC authorization</li>
<li>Financial records CRUD operations</li>
<li>Filtering by type, category, and date range</li>
<li>Pagination support</li>
<li>Dashboard analytics (income, expenses, trends)</li>
<li>Input validation using express-validator</li>
<li>Centralized error handling</li>
<li>MongoDB Atlas persistence</li>
<li>Admin seed script</li>
</ul>

<h2>🛠 Tech Stack</h2>
<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>MongoDB Atlas</li>
<li>Mongoose</li>
<li>JSON Web Token (JWT)</li>
<li>express-validator</li>
<li>bcryptjs</li>
<li>dotenv</li>
</ul>

<h2>📁 Project Structure</h2>
<pre>
src/
  app.js
  server.js
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
  scripts/
</pre>

<h2>⚙️ Setup Instructions</h2>

<ol>
<li>Install dependencies</li>
</ol>
<pre>npm install</pre>

<ol start="2">
<li>Create environment file</li>
</ol>
<pre>copy .env.example .env</pre>

<ol start="3">
<li>Configure environment variables</li>
</ol>
<pre>
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
</pre>

<ol start="4">
<li>Run the server</li>
</ol>
<pre>npm run dev</pre>

<h2>🌱 Seed Admin</h2>
<pre>npm run seed:admin</pre>

<p><strong>Credentials:</strong></p>
<ul>
<li>Email: admin@example.com</li>
<li>Password: admin123</li>
</ul>

<h2>🔐 Authentication</h2>
<p>Use JWT token in request headers:</p>
<pre>Authorization: Bearer &lt;your_token&gt;</pre>

<h2>🧪 How to Test</h2>
<ul>
<li>Use Postman or any API client</li>
<li>Login using seeded admin credentials</li>
<li>Copy JWT token from response</li>
<li>Add token in Authorization header</li>
<li>Test protected endpoints</li>
</ul>

<h2>🌐 Base URLs</h2>
<table border="1" cellpadding="6">
<tr><th>Environment</th><th>URL</th></tr>
<tr><td>Local</td><td>http://localhost:5000</td></tr>
<tr><td>Production</td><td>https://finance-dashboard-backend-ns29.onrender.com</td></tr>
</table>

<h2>📡 API Endpoints</h2>

<h3>Health</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Route</th><th>Access</th><th>Purpose</th></tr>
<tr><td>GET</td><td>/health</td><td>Public</td><td>Service health check</td></tr>
<tr><td>GET</td><td>/</td><td>Public</td><td>API status message</td></tr>
</table>

<h3>Auth</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Route</th><th>Access</th><th>Purpose</th></tr>
<tr><td>POST</td><td>/api/auth/login</td><td>Public</td><td>Authenticate user and return JWT</td></tr>
</table>

<h3>Users</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Route</th><th>Access</th><th>Purpose</th></tr>
<tr><td>GET</td><td>/api/users</td><td>Admin</td><td>List users</td></tr>
<tr><td>POST</td><td>/api/users</td><td>Admin</td><td>Create user</td></tr>
<tr><td>PATCH</td><td>/api/users/:id</td><td>Admin</td><td>Update user role/status</td></tr>
</table>

<h3>Financial Records</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Route</th><th>Access</th><th>Purpose</th></tr>
<tr><td>GET</td><td>/api/records</td><td>Viewer, Analyst, Admin</td><td>List records with filtering/pagination</td></tr>
<tr><td>GET</td><td>/api/records/:id</td><td>Viewer, Analyst, Admin</td><td>Get single record</td></tr>
<tr><td>POST</td><td>/api/records</td><td>Admin</td><td>Create record</td></tr>
<tr><td>PATCH</td><td>/api/records/:id</td><td>Admin</td><td>Update record</td></tr>
<tr><td>DELETE</td><td>/api/records/:id</td><td>Admin</td><td>Delete record</td></tr>
</table>

<h3>Dashboard</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Route</th><th>Access</th><th>Purpose</th></tr>
<tr><td>GET</td><td>/api/dashboard/summary</td><td>Analyst, Admin</td><td>Total income, expenses, net balance</td></tr>
<tr><td>GET</td><td>/api/dashboard/categories</td><td>Analyst, Admin</td><td>Category-wise totals</td></tr>
<tr><td>GET</td><td>/api/dashboard/trends/monthly</td><td>Analyst, Admin</td><td>Monthly trends</td></tr>
</table>

<h2>🔍 Filtering Example</h2>
<pre>
GET /api/records?type=income&category=salary&page=1&limit=10
</pre>

<h2>⚖️ Assumptions & Trade-offs</h2>
<ul>
<li>Viewer has read-only access to financial records</li>
<li>Analyst can access records and dashboard insights</li>
<li>Admin has full access</li>
<li>This differs from stricter viewer-dashboard-only models but reflects real-world use cases</li>
<li>JWT kept simple for assignment scope</li>
<li>Focus on clean architecture over production-level features</li>
</ul>

<h2>🚧 Future Improvements</h2>
<ul>
<li>Add automated tests</li>
<li>Add rate limiting</li>
<li>Add Swagger/OpenAPI documentation</li>
<li>Standardize API responses</li>
<li>Add soft delete and audit logs</li>
</ul>

<h2>🧠 Conclusion</h2>
<p>
This backend demonstrates clean architecture, RBAC, validation, and aggregation logic aligned with real-world backend systems.
</p>
