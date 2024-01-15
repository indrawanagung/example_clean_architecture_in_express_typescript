CREATE TABLE notes (
	id varchar NOT NULL,
	task_name varchar NULL,
	status_id varchar NULL,
	last_updated varchar NULL,
	CONSTRAINT notes_pk PRIMARY KEY (id)
);
