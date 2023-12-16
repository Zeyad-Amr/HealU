# Clinic

To set up and run the Clinic project, follow these steps:

1. Initialize the project with npm:

   ```bash
   npm init -y
   ```

2. Install Prisma as a development dependency:

   ```bash
   npm install prisma --save-dev
   ```

3. Initialize Prisma with the following command:

   ```bash
   npx prisma init
   ```

   After executing the third command, a `.env` file will be created. Open this file and update the `DATABASE_URL` to match your database configuration.

4. Migrate the databases using the following command, replacing `migrate-name` with a descriptive name for your migration:

   ```bash
   npx prisma migrate dev --name migrate-name
   ```

   This command ensures that your database is set up according to the specified migration.

5. To run the project, execute:

   ```bash
   node index.js
   ```

   This will start the Clinic project.

Feel free to reach out if you encounter any issues or have further questions.