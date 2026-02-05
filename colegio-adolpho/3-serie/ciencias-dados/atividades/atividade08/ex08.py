# * Importações
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.read_csv('student_performance.csv')

print(df.head())
print(df.info())

target_mapping = {
    'F': 1,
    'D': 2,
    'C': 3,
    'B': 4,
    'A': 5
}

df['grade'] = df['grade'].map(target_mapping)

corr = df.corr()

plt.figure(figsize=(10, 8))
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.show()
