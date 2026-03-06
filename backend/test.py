from data_generator import generate_dataset
import numpy as np

# Test best case manually
distance     = 10
obstacles    = 0
frequency    = 28
weather      = 0.0
interference = 0
tower_height = 50

signal = (
    -20 * np.log10(distance)
    - 20 * np.log10(frequency)
    - 32.45
    + tower_height * 0.3
    - obstacles * 3.0
    - weather * 5.0
    - interference * 0.5
)

print(f"Best case signal: {signal:.2f} dBm")

# Worst case
distance     = 500
obstacles    = 4
frequency    = 60
weather      = 1.0
interference = 10
tower_height = 20

signal2 = (
    -20 * np.log10(distance)
    - 20 * np.log10(frequency)
    - 32.45
    + tower_height * 0.3
    - obstacles * 3.0
    - weather * 5.0
    - interference * 0.5
)

print(f"Worst case signal: {signal2:.2f} dBm")