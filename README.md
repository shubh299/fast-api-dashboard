# Leads Dashboard

## Features

1. Get list of leads: A paginated list of leads displaying Name, Email, Company, Stage, Engagement Status and Last Contacted Date.
2. Filter leads: The leads can be filtered by Name, Company, Email or Engagement Status.
3. Sorting the results: Sort by any column.
4. Add New lead: Add a new lead by providing Name, Email, Company and Stage (default value 0).
5. Export all leads: Export list of all leads as CSV.
6. Modify lead: Update any field in the lead or delete the lead.

## Backend

### API

#### Health Check

GET `/health`

- Checks if the service is running.

- Response: { "status": "ok" }

#### Get Leads (Paginated)

GET `/leads`

Retrieves a paginated list of leads.

Request Params:

- start (integer): Start number of the Page. Default value 0.
- limit (integer): Number of rows to get. Default value 10.
- searchQuery (string): Search query for name, email or company name. Optional.
- engaged (boolean): Filter by engagement status. Optional.
- sortColumn (string): Column to sort on. Optional.
- sortOrder (AS C, DESC): Sort order for the column, only applies if the sortColumn is passed. Default ASC.

Response: data: list of leads, totalCount, start, end

#### Add Lead

POST `/lead`

Request Body:

- name (string): Name of the lead.
- email (string): Email of the lead. Should be a valid email format.
- company (string): Company of the lead.
- engaged (boolean): If the lead is engaged. Default false.
- stage (intger): Stage of the lead. Default 0.

Response: Newly created lead details.

Errors:

- 400 - email already exists.
- 422 - Parameter validation failure.

#### Update Lead

PATCH `/update_lead/{lead_id}`

Updates a lead's details.

Request Body: Fields that need to be updated are only required to be passed.

- name (string): Name of the lead.
- email (string): Email of the lead. Should be a valid email format.
- company (string): Company of the lead.
- engaged (boolean): If the lead is engaged.
- stage (intger): Stage of the lead.
- lastContacted (date): Last contact date with lead.

Response: Updated lead details.

Errors: 404 - lead not found, 400 - email already exists

#### Delete Lead

DELETE /delete_lead/{lead_id}

Deletes a lead by ID.

Response: { "message": "lead deleted successfully" }

Errors: 404 - lead not found

#### Export Leads

GET /export_leads/

Exports all leads in CSV format.

Response: CSV file.

---

### DB Model

PostgreSQL is used for database and SQLAlchemy is the ORM layer.

#### Table: `leads`

The `Leads` model represents a lead in the system.

| Column        | Type     | Description                         |
| ------------- | -------- | ----------------------------------- |
| id            | UUID     | Primary Key                         |
| createdAt     | DateTime | Timestamp when the lead was created |
| updatedAt     | DateTime | Last update timestamp               |
| name          | String   | Lead's name                         |
| email         | String   | Unique email address                |
| company       | String   | Associated company                  |
| engaged       | Boolean  | Engagement status                   |
| stage         | Integer  | Lead's pipeline stage               |
| lastContacted | Date     | Last contacted date                 |

---

### Repository

The `LeadsRepository` class provides an abstraction over database operations.

#### Methods:

- `create_lead(lead_params)`: Creates a new lead.
- `get_lead_by_email(email)`: Fetches a lead by email.
- `get_lead_by_id(lead_id)`: Retrieves a lead by ID.
- `delete_lead_by_id(lead_id)`: Deletes a lead by ID.
- `get_leads(params)`: Fetches leads with filters and pagination.
- `update_lead(lead_id, update_params)`: Updates a lead's details.
- `get_all_leads()`: Retrieves all leads.

### Dependencies

```
fastapi==0.115.11
sqlalchemy==2.0.38
psycopg2-binary==2.9.10
```

---

## Frontend

### Components

#### Header

Has title of the page, add new lead button and export all leads button.

- AddLeadModal: Modal form to add a new lead.

#### FilterComponent

Has search bar and button for filtering by engagement status and sorting leads.

- FilterAndSortModal: Modal to sort and filter leads.

#### LeadsTable

- A text to show number of leads shown to user and total number of leads based on filters.
- A table to show leads. Each row has profile icon, name, email, company name, stage, engagement status, last contacted date and action icon to update or delete the lead.
- Page list to navigate the leads.

### Dependencies

```
react
react-pagination
axios
```

---

## Start Backend and Frontend

Pre-requisite: Docker is installed and running.

### Starting both backend and frontend

At the root of the repo, execute:

```
docker compose up --build
```

This starts backend server at port 8080 and frontend server at 3000 and a container hosting PostgreSQL DB at port 5432.

- Change frontend server port: To change frontend server port, update `docker-compose.yaml` line 8. Also, update line 21 to allow requests from frontend. Note that docker image for front-end has to be built again as React does not take run-time environment variables.
- Changing backend server port: To change backend server port, update `docker-compose.yaml` line 16. Also, update line 6 for updating backend URL in frontend.

### Starting only backend server

1. Go to `app/` folder.

```
cd app/
```

2. Start server and postgres containers:

```
docker compose up --build
```

`--build` is not need on subsequent runs as images are already built. To rebuild images before starting the server, either use `docker build` or use `--build` with `docker compose`.

### Starting only frontend server

1. Go to `dashboard/` folder.

```
cd dashboard/
```

2. Start server:

```
docker compose up --build
```

### Seeding Data

1. Start backend server.
2. Run the following commands in root folder of the repository. Python 3.11 is required.

```
pip install -r seed_requirements.txt
python seeding_script.py <number_of_leads_to_populate> <add_backend_url>
```

The script will populate the leads specified in the command. For half of the leads, last contacted will also be populated.

---
