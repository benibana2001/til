create table User
(
  id int primary key auto_increment,
  name varchar(255) not null,
  mail varchar(255) not null
);

insert User (id, name, mail) VALUES
(
 null,
 'Yamada Alex',
 'Yamada@jp'
);

insert User (id, name, mail) VALUES
(
  null,
  'Satou Jay',
  'Satou@jp'
);
