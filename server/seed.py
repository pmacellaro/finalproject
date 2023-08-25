from database_utils import delete_records, create_records

if __name__ == '__main__':
    print("Starting seeding")
    delete_records()
    created_squishes = create_records()
    print("Seeding complete:", created_squishes)    