# HKTVMALL Coding Testing 
## Prepare 
Front end : 
IDE : VSCode
Framework: Reactjs

Back end: 
IDE: IntelliJ
Framework: Spring boot

Database: MySql


## Design Idea

Database : 
There are two tables in the MySQL database.
![](readMe_files/1.jpg)

The relationship of tables is one to many. 
A product should be stored in different warehouses.
Each warehouse has its quantities of a product.


### The Back end design
The project is created by Spring boot framework. 
There are four packages which are controller, exception, model and repository.
![](readMe_files/2.jpg)

The main ideas are using restful APIs for CURD product information.


Below the coding is restful API for modifying product information.
```
 @GetMapping("/products")
    public List<Product> getAllProdcuts() {
        return productRepository.findAll();
    }
	
 @PostMapping("/product")
    public Product createProdcut(@Valid @RequestBody Product product) {
        return productRepository.save(product);
    }
	
 @PutMapping("/products/{code}")
	public Product updateProdcut(@PathVariable String code,
								 @Valid @RequestBody Product newProductInfo) throws ProductNotFoundException {
		return productRepository.findById(code)
				.map(product -> {
					product.setCode(newProductInfo.getCode());
					product.setName(newProductInfo.getName());
					product.setWeight(newProductInfo.getWeight());
					return productRepository.save(product);
				}).orElseThrow(() -> new ProductNotFoundException("Product not found with code " + code));
	}
```
The github link : [](https://github.com/Silasip2002/hktvmallBackend)

## Front End Design
The front page is created by Reas js. 

For getting the list of products. The page will call the  back end API, which will return 
a JSON result. 

![](readMe_files/3.jpg)

![](readMe_files/4.jpg)

The github link : [](https://github.com/Silasip2002/hktvmall)


# Installation Gudie : 

## step 1 Create a DB :

```
-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 12, 2020 at 02:04 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `hktvmall`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `code` varchar(20) NOT NULL,
  `name` varchar(99) NOT NULL,
  `weight` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`code`, `name`, `weight`) VALUES
('FM-HKTV01', 'Face Mask', 100),
('FM-HKTV02', 'Korean Face Mask', 200);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `id` int(10) NOT NULL,
  `location` varchar(10) NOT NULL,
  `quantity` int(10) NOT NULL,
  `product_code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`id`, `location`, `quantity`, `product_code`) VALUES
(1, 'TKO', 1000, 'FM-HKTV01'),
(2, 'TKO', 200, 'FM-HKTV01'),
(3, 'MK', 100, 'FM-HKTV01'),
(4, 'ST', 4000, 'FM-HKTV01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD KEY `FKdqkh4y375pbc2t9qi8v5ylwk4` (`product_code`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `FKdqkh4y375pbc2t9qi8v5ylwk4` FOREIGN KEY (`product_code`) REFERENCES `product` (`code`);
```

### Step 2 :  Connect the DB

Set the db informatin in the src/main/java/resource/application.properties
```
## Spring DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
spring.datasource.url = jdbc:mysql://localhost:8889/hktvmall
spring.datasource.username = silas1
spring.datasource.password = silas1
## Hibernate Properties
# The SQL dialect makes Hibernate generate better SQL for the chosen database
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5InnoDBDialect
# Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto = update
```

### Step 3: run the back end server
run by the IDE.

### Step 4: run the front end server 
```
npm start
```


# Conclusion: 
This project is a challenge for me. Even though the project is not completed,
but I have learnt a lot from it. It is a short time to learn a new framework and restful Api. 
The most difficult challenge is data translation as the import data is a CSV file.
It is difficult for creating new product information in the two table database. 
The next action should need to cut off the original data from the CSV file then using the 
post method to send to the backend for inserting the new product.


