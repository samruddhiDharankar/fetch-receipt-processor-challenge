# Installation

1. Clone the repository:

```
git clone https://github.com/samruddhiDharankar/fetch-receipt-processor-challenge.git
cd fetch-receipt-processor-challenge
```

2. Start Docker Enginer & Build the Docker image:

```
docker build -t fetch-receipt-processor .
```

3. Run the Docker container:

```
docker run -p 3000:3000 fetch-receipt-processor
```

4. Go to postman
   Hit the api endpoint :: submit a receipt for processing

```
curl --location 'http://localhost:3000/api/v1/receipts/process' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}'
```

Copy the ID from the response and use it as a parameter in the api endpoint :: Get points awarded for a specific receipt by ID

```
curl --location 'http://localhost:3000/api/v1/receipts/:id/points' \
--header 'Accept: application/json'
```

You should see the total points in the response
