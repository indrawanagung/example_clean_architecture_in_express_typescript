ALTER TABLE notes ADD CONSTRAINT notes_fk FOREIGN KEY (status_id) REFERENCES status(id)
