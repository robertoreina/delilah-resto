
USE delilah;

-- ----------------------------------------------------------------------------------------
-- users
-- ----------------------------------------------------------------------------------------


CREATE OR REPLACE TABLE users (
	id int not null primary key AUTO_INCREMENT,
	user varchar(255) not null,
	name varchar(255) not null,
	email varchar(255) not null,
	phone varchar(16) not null,
	address varchar(255) not null,
	password varchar(255) not null,
	is_admin tinyint default (false),
	update_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into users 
values (null, 'ADMIN', 'Administrador', 'admin@delilah.com', '56995694692', 'Santiago',
	    'ADMIN', true, null);


-- ----------------------------------------------------------------------------------------
-- favorites
-- ----------------------------------------------------------------------------------------

CREATE OR REPLACE TABLE favorites (
	id 		int not null primary key AUTO_INCREMENT,
	user_id int not null,
	product_id int not null,
	update_Date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) references users (id),
	foreign key (product_id) references products (id),
	unique (user_id, product_id)
);


-- ----------------------------------------------------------------------------------------
-- products
-- ----------------------------------------------------------------------------------------

CREATE OR REPLACE TABLE products (
	id 		int not null primary key AUTO_INCREMENT,
	description varchar(255) not null,
	price double,
	quantity_available int,
	update_Date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- ----------------------------------------------------------------------------------------
-- PayTypes
-- ----------------------------------------------------------------------------------------
CREATE OR REPLACE TABLE paytypes (
	id 		int not null primary key AUTO_INCREMENT,
	description varchar(255) not null
);

insert into paytypes values (null, 'Efectivo');
insert into paytypes values (null, 'Tarjeta de Debito');
insert into paytypes values (null, 'Tarjeta de Credito');
insert into paytypes values (null, 'Trasferencia');


-- ----------------------------------------------------------------------------------------
-- StatusOrders
-- ----------------------------------------------------------------------------------------
CREATE OR REPLACE TABLE StatusOrders (
	id 		int not null primary key AUTO_INCREMENT,
	description varchar(255) not null
);

insert into StatusOrders values (null, 'Nuevo');
insert into StatusOrders values (null, 'Confirmado');
insert into StatusOrders values (null, 'Preparando');
insert into StatusOrders values (null, 'Enviando');
insert into StatusOrders values (null, 'Entregado');


-- ----------------------------------------------------------------------------------------
-- orders
-- ----------------------------------------------------------------------------------------

CREATE OR REPLACE TABLE orders (
	id 		  int not null primary key AUTO_INCREMENT,
	status_id int not null,
	user_id int not null,
	date_time datetime,
	total_amount double not null,
	pay_type_id int not null,
	update_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) references users (id),
	foreign key (status_id) references StatusOrders (id),
	foreign key (pay_type_id) references paytypes (id)
);

-- ----------------------------------------------------------------------------------------
-- ProductOrders
-- ----------------------------------------------------------------------------------------

CREATE OR REPLACE TABLE orders_has_products (
	order_id   int not null,
	product_id int not null,
	quantity   int not null,
	price      double not null,
	comments   varchar(255),
	update_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (order_id) references orders (id),
	foreign key (product_id) references products (id)
);



