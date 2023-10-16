import { db } from "../database/database.connection.js";

async function insert(notification) {
	return await db.query(
		`INSERT INTO notifications ("from_user_id", "to_user_id", "cat_id", "type") VALUES ($1, $2, $3, $4);`,
		[
			notification.fromUserId,
			notification.toUserId,
			notification.catId,
			notification.type,
		]
	);
}

async function findByRecipient(id) {
	console.log(id);
	return await db.query(
		`SELECT 
            n.id, 
            JSON_BUILD_OBJECT('username', u.name, 'url', u.url, 'userId', u.id) AS "from",
            JSON_BUILD_OBJECT('catName', c.name, 'url', c.url, 'catId', c.id) AS "cat",
            "type"
        FROM notifications n
        INNER JOIN users u ON n."from_user_id" = u.id
        INNER JOIN cats c ON n."cat_id" = c.id
        WHERE "to_user_id" = $1;`,
		[id]
	);
}

async function findById(id) {
	return await db.query(
		`WITH 
            sender AS (SELECT id, "name", url FROM users), 
            recipient AS (SELECT id, "name", url FROM users)
        SELECT 
            n.id, 
            JSON_BUILD_OBJECT('username', s.name, 'url', s.url, 'userId', s.id) AS "from",
            JSON_BUILD_OBJECT('username', r.name, 'url', r.url, 'userId', r.id) AS "to",
            JSON_BUILD_OBJECT('catName', c.name, 'url', c.url, 'catId', c.id) AS "cat",
            "type"
        FROM notifications n
        INNER JOIN sender s ON n."from_user_id" = s.id
        INNER JOIN recipient r ON n."to_user_id" = r.id
        INNER JOIN cats c ON n."cat_id" = c.id
        WHERE n.id = $1;`,
		[id]
	);
}

async function remove(id) {
	return await db.query(`DELETE FROM notifications WHERE id = $1;`, [id]);
}

export const notificationRepositories = {
	insert,
	findByRecipient,
	findById,
	remove,
};
