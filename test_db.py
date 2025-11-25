import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv('Database_API/.env')

try:
    cnx = mysql.connector.connect(
        user=os.environ['MYSQL_USER'],
        password=os.environ['MYSQL_PASSWORD'],
        host=os.environ['MYSQL_HOST'],
        database=os.environ['MYSQL_DB'],
    )
    cursor = cnx.cursor()
    
    print("✅ Database connection successful!")
    
    cursor.execute("SELECT * FROM voters")
    voters = cursor.fetchall()
    
    if voters:
        print(f"\n✅ Found {len(voters)} voter(s) in database:")
        for voter in voters:
            print(f"   - voter_id: {voter[0]}, role: {voter[1]}")
    else:
        print("\n❌ No voters found in database!")
        print("You need to add voters to the database.")
        
    cursor.close()
    cnx.close()
    
except mysql.connector.Error as err:
    print(f"❌ Database error: {err}")
    print("\nMake sure:")
    print("1. MySQL is running")
    print("2. Database 'voter_db' exists")
    print("3. Table 'voters' exists")
    print("4. Credentials in .env are correct")
