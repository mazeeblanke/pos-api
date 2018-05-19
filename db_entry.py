
import psycopg2

def createcon(dbname, user, host, port):
    try:
        con = psycopg2.connect(database=dbname, user=user,
                               password='password1234', host=host, port=port)
    except:
        print('Unable to connect to the database')
    cursor = con.cursor()
    return con, cursor



import pandas as pd
import random

def table_products():
  print ('1')
  con,cursor=createcon('pos_multistore','i5dr0id','localhost','5432')
  print ('2')
  con.autocommit=True
  df_product=pd.read_csv('FINAL_salesdata.csv')
  print ('3')
  product_data=df_product.loc[:,['productcode','product','quantity','unitprice']]
  print ('4')
  for index,row in product_data.iterrows():
    idcode=row['productcode'];name=row['product']
    quantity=row['quantity'];unitprice=row['unitprice']+10
    costprice=row['unitprice'];status='active'
    rand1=random.randint(1000,9999);rand2 = random.randint(1000,9999)
    barcode=str(rand1)+str(rand2)
    print (name,quantity,unitprice,costprice,barcode,status)
    cursor.execute("""
    insert into products(name,quantity,unitprice,costprice,barcode,status)
    values(%s,%s,%s,%s,%s,%s)on conflict(name)do nothing""",(name,str(quantity),unitprice,costprice,barcode,status))

table_products()
