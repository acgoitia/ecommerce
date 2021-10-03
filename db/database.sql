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