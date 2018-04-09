-- create sample types
INSERT INTO types_of_travellers (type) VALUES
  ('Business'),
  ('Family'),
  ('Solo');

-- create sample users
INSERT INTO users (username, age, gender, nationality, email, occupation, types_of_travellers, password) VALUES
	('Jacob', '30', 'male', 'Singaporean', 'tanenkai@gmail.com', 'Web Developer', 'Solo', 'abcdefg'),
	('Matthew', '28', 'male', 'Singaporean', 'matthew123@gmail.com', 'Digital Marketer', 'Business', 'hijklmn'),
	('Grace', '27', 'female', 'Malaysian', 'grace123@yahoo.com', 'Graphic Designer', 'Family', 'opqrstu');

-- create sample logs
WITH temp (username, title, country, city, travel_period, content, created_at, types_of_travellers) AS
(VALUES
	('Jacob', 'Trip to Spain', 'Spain', 'Barcelona', 'September 2014', 'The moment I stepped out of the plane and walked into EL Prat arrival hall, I was filled with excitement and felt re-energized after the long flight from home.', '2014-9-01', 'Solo'),
	('Matthew', '9 Days Trip to Japan', 'Japan', 'Kyoto', 'June 2017', 'Arashiyama was the only thing in my mind when I was preparing to go on a business trip to Kyoto.', '2017-6-06', 'Business'),
	('Grace', 'Seoul', 'South Korea', 'Seoul', 'July 2017', 'Don’t worry about jet lag: Seoul is bright, fast, buzzing and literally never sleeps; its stretches of glowing neon signs and cacophonous, day-to-night markets will keep you charged from the minute you touch down (and if you start to crash, one of the city’s trademark day spas is never far). Catch the 45 minute express train in from Incheon Airport, drop your bags inside the spanking new Le Meridien, which opened last year with 336 art-filled rooms in trendy Gangnam, and hop on the subway north to Dongdaemun.', '2017-7-10', 'Family')
)
INSERT INTO logs
	(title, country, city, travel_period, content, created_at, author_id, types_of_travellers)
SELECT
	temp.title, temp.country, temp.city, temp.travel_period, temp.content, temp.created_at::date, users.id, types_of_travellers.type
FROM   
	users JOIN temp
	ON temp.username = users.username
	JOIN types_of_travellers
		on temp.types_of_travellers = types_of_travellers.type;

-- create sample comments
WITH temp (title, content, created_at, username) AS
(VALUES
		('9 Days Trip to Japan', 'Arashiyama is a mystical place!', '2017-6-10', 'Jacob'),
		('Trip to Spain', 'I love Barcelona, the art scene there is great!', '2014-9-5', 'Grace')
)
INSERT INTO comments
	(title, content, created_at, username, author_id)
SELECT
	temp.title, temp.content, temp.created_at::date, temp.username, users.id
FROM
	users JOIN temp
	ON temp.username = users.username
	JOIN logs
		on temp.title = logs.title;