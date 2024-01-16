# Clean Architecture API With Express Typescript

## Description
This project is a simple code for clean architecture pattern using Express Typescript and TypeORM.

Rule of Clean Architecture System by Uncle Bob

- Independent of Frameworks. The architecture does not depend on the existence of some library of feature laden software. This allows you to use such frameworks as tools, rather than having to cram your system into their limited constraints.
- Testable. The business rules can be tested without the UI, Database, Web Server, or any other external element.
- Independent of UI. The UI can change easily, without changing the rest of the system. A Web UI could be replaced with a console UI, for example, without changing the business rules.
- Independent of Database. You can swap out Oracle or SQL Server, for Mongo, BigTable, CouchDB, or something else. Your business rules are not bound to the database.
- Independent of any external agency. In fact your business rules simply don’t know anything at all about the outside world.


#### The diagram:

![golang clean architecture](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
More at https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

This project has 4 Domain layer :

- Model/Entity Layer
- Repository Layer
- Usecase/Service Layer
- Delivery/Controller Layer


It may different already, but the concept still the same in application level.

### Database
In this project, I use postgresql to store note and status data. To help me in doing some database schema migration, I use  [Golang-Migrate](https://flywaydb.org/https://github.com/golang-migrate/migrate)  to help me creating all tables and updating the schema.

To use Golang-Migrate in Express application, simply define command filepath and put all migration scripts in  `db/migrations`  under resources folder.
```bash
### Create migration file using golang-migrate
$ migrate create -ext sql -dir db/migrations -seq create_users_table
```

### Tools Used:

In this project, I use some tools listed below. But you can use any simmilar library that have the same purposes. But, well, different library will have different implementation type. Just be creative and use anything that you really need.

- To write unit test and integration test, i use library [`JEST`](https://jestjs.io/)
- [TypeORM.](https://typeorm.io/) To handle SQL Query and SQL Injection.
- [Winston.](https://github.com/winstonjs/winston) Handle Logging System
- [UUID.](https://github.com/uuidjs/uuid) To Create Unique Id string

### How To Run :
#### Before you start
- Install Docker https://www.docker.com/
- Install Golang Migrate https://github.com/golang-migrate/migrate/tree/master/cmd/migrate
- Install Express JS https://expressjs.com/
#### Running Docker Postgre Image
Inside the project repository, running command `make postgres` to create and running container postgres database
```bash
### Run Docker Postgre SQL Image 
$ make postgres
```
#### Create Database Notes
To create database notes, running command `make createdb` or you can setting this configuration on Makefile `./Makefile`
```bash
### Create Database Notes on Posgre SQL
$ make createdb
```
#### Run Migration Schema
Run command `make migrateup` to create all schema to database notes automatically in file `db/migrations`. If you want to rollback all schema, run command `make migratedown`
```bash
### Create all schema to database notes
$ make migrateup
```
#### Install All Dependency
To install all dependency in this project, run command `npm install`
```bash
### Install all dependency
$ npm install
```
#### Run Server API
Running express server api using command `npm start`
```bash
### Running Server API
$ npm start
```
#### Running All Unit and Integration Test
```bash
### Running all test using jest and supertest
$ npm run test
```
