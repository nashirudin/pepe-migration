module.exports = class Data1703597794583 {
    name = 'Data1703597794583'

    async up(db) {
        await db.query(`CREATE TABLE "approval" ("id" character varying NOT NULL, "owner" bytea NOT NULL, "spender" bytea NOT NULL, "value" numeric NOT NULL, "block_number" numeric NOT NULL, "block_timestamp" numeric NOT NULL, "transaction_hash" bytea NOT NULL, CONSTRAINT "PK_97bfd1cd9dff3c1302229da6b5c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "ownership_transferred" ("id" character varying NOT NULL, "previous_owner" bytea NOT NULL, "new_owner" bytea NOT NULL, "block_number" numeric NOT NULL, "block_timestamp" numeric NOT NULL, "transaction_hash" bytea NOT NULL, CONSTRAINT "PK_f6d006434fd73398928f8110040" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "from" bytea NOT NULL, "to" bytea NOT NULL, "value" numeric NOT NULL, "block_number" numeric NOT NULL, "block_timestamp" numeric NOT NULL, "transaction_hash" bytea NOT NULL, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "approval"`)
        await db.query(`DROP TABLE "ownership_transferred"`)
        await db.query(`DROP TABLE "transfer"`)
    }
}
