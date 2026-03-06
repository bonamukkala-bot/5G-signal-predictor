import numpy as np
import pandas as pd

def generate_dataset(n=500, seed=42):
    np.random.seed(seed)

    distance     = np.random.uniform(10, 500, n)
    obstacles    = np.random.randint(0, 5, n)
    frequency    = np.random.choice([28, 39, 60], n)
    weather      = np.random.uniform(0, 1, n)
    interference = np.random.uniform(0, 10, n)
    tower_height = np.random.uniform(20, 50, n)

    noise = np.random.normal(0, 1.5, n)

    signal = (
        -20 * np.log10(distance)
        - 20 * np.log10(frequency)
        - 32.45
        + tower_height * 0.3
        - obstacles * 3.0
        - weather * 5.0
        - interference * 0.5
        + noise
    )

    df = pd.DataFrame({
        'distance':     distance,
        'obstacles':    obstacles,
        'frequency':    frequency,
        'weather':      weather,
        'interference': interference,
        'tower_height': tower_height,
        'signal':       signal
    })

    return df