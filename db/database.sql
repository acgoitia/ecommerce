CREATE TABLE IF NOT EXISTS public.user (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      email VARCHAR(50) NOT NULL,      
      password TEXT NOT NULL,
      created TIMESTAMP WITHOUT TIME ZONE,
      modified TIMESTAMP WITHOUT TIME ZONE
);


CREATE TABLE IF NOT EXISTS public.categories (
    id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    category        VARCHAR(50)     NOT NULL
);


CREATE TABLE IF NOT EXISTS public.products (
    id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name            VARCHAR(50)     NOT NULL,
    price           BIGINT          NOT NULL,
    inventory       INT,
    categoryid      INT,
    image_url       VARCHAR(255),
    description     VARCHAR(255)     NOT NULL,
    FOREIGN KEY (categoryid) REFERENCES public.categories(id)
);


CREATE TABLE IF NOT EXISTS public.orders (
    id              INT                             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_id         INT                             NOT NULL,
    created         TIMESTAMP WITHOUT TIME ZONE     NOT NULL,
    modified        TIMESTAMP WITHOUT TIME ZONE     NOT NULL,
    status          VARCHAR(50)                     NOT NULL,
    total           BIGINT                          NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(id)
);


CREATE TABLE IF NOT EXISTS public.order_items (
    id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    order_id        INT             NOT NULL,
    pdoruct_id      INT             NOT NULL,
    price           BIGINT          NOT NULL,
    quantity        INT             NOT NULL,
    FOREIGN KEY (order_id) REFERENCES public.orders(id),
    FOREIGN KEY (pdoruct_id) REFERENCES public.products(id)
);


CREATE TABLE IF NOT EXISTS public.cart (
    id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_id         INT             NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(id)
);


CREATE TABLE IF NOT EXISTS public.cart_items (
    id              INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    product_id      INT             NOT NULL,
    cart_id         INT             NOT NULL,
    price           BIGINT          NOT NULL,
    quantity        INT             NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES public.cart(id),
    FOREIGN KEY (product_id) REFERENCES public.products(id)
);

INSERT INTO public.categories (category)
VALUES ('drinks'),
        ('food');

INSERT INTO public.products (name, price, inventory, categoryid, image_url, description)
VALUES  ('Water', 5.99, 100, 1, '/images/1_Agua_ePura.jpg', 'Individual water bottle, 250 ml'),
        ('Juice', 4.99, 100, 1, '/images/2_Unico_Fresco.jpg', '1L Orange Juice container'),
        ('Milk', 5.99, 100, 1, '/images/3_Alpura_Clasica.jpg', '1Gal whole milk carton'),
        ('Bread', 2.99, 100, 2, '/images/4_Pan_Bimbo.jpg', '500g Woner bread'),
        ('Meat', 8.99, 100, 2, '/images/5_Carne.jpg', '500g ground bief'),
        ('Chicken', 6.99, 100, 2, '/images/6_Pollo.jpg', '500g organich chicken thighs');