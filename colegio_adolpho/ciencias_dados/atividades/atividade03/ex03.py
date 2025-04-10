import pandas as pd
weapons = pd.read_csv('skyrim_weapons.csv')
weapons['Speed'] 
Skyrim = weapons.drop_duplicates().dropna().drop('Type', axis=1).drop('Speed', axis=1).drop('Perk', axis=1).drop('Upgrade', axis=1).drop('Gold', axis=1).sort_values('Name')
print(Skyrim)
new_csv = input('Quer salvar como um novo CSV? (S/N): ').upper()[0]
if new_csv == 'S':
    Skyrim.to_csv('Skyrim.csv')
