# Hall Effect Calculator

A simple web-based calculator for estimating Hall effect parameters (single band, classical system). This tool allows for the interactive exploration of the relationships between experimental setup variables (like current, magnetic field, and sample thickness) and carrier density. Only the magnitude is considered, the sign of carriers is ignored. 

***

## Key Features

-   **Real-time Bidirectional Calculations**: Changing an experimental parameter (e.g., current) instantly updates the material properties. Conversely, modifying a material property (e.g., carrier density) recalculates the expected experimental outcome (Hall voltage).
-   **Unit Conversion**: Each parameter supports multiple units:
    -   **Current (I)**: A, mA, µA
    -   **Magnetic Field (B)**: T, mT, G
    -   **Thickness (t)**: m, cm, mm, µm
    -   **Hall Voltage (V_H)**: V, mV, µV
    -   **Carrier Density (n)**: m⁻³, cm⁻³
    -   **Hall Coefficient (R_H)**: m³/C, cm³/C, Ohm·cm/G
-   **AC/DC Modes**: Current and Voltage can be specified as `peak` or `rms` (root mean square) values for AC signals.
-   **Differential Measurement**: An option to calculate the Hall Voltage based on the difference between measurements at positive and negative magnetic fields (`V_H(diff) = V(+B) - V(-B)`). (Note : this is the case for our [Halbach](https://github.com/nitad54448/Halbach) setup.

***

## How to Use

1.  **Enter Known Values**: Input your known parameters in either the **Experimental Setup** or **Material Properties** cards.
2.  **Select Units**: Choose the desired unit for each input from the dropdown menus. For current and voltage, you can also select `peak` or `rms` mode. Lock-in reading is always RMS reading  while most AC sources are given in peak units !
3.  **Adjust with Sliders**: Use the sliders for a dynamic view of how changing one parameter affects the others.
4.  **Toggle Differential Mode**: If your Hall Voltage measurement is a differential value (`V(+B) - V(-B)`), check the "Differential" box. This will adjust the calculations accordingly (or just double the field !).
_Note for the users of our measurement system_, described [here](https://github.com/nitad54448/Halbach): there is similar calculator in the Labview program, there is no option for differential mode there, so remember to double the value of the magnetic field in the calculator fields and not in the experimental one.
    
6.  **View Results**: The calculator will automatically compute and display the corresponding values in the other card in real-time.

***

## Governing Equations

The calculator operates based on the fundamental formulas of the Hall effect.

### Hall Voltage ($V_H$)

The Hall Voltage is calculated from the material's properties and the experimental conditions.

$$
V_H = \frac{R_H \cdot I \cdot B}{t}
$$

### Hall Coefficient ($R_H$)

The Hall Coefficient is determined from the experimental measurements.

$$
R_H = \frac{V_H \cdot t}{I \cdot B}
$$

### Carrier Density ($n$)

The charge carrier density is derived from the Hall Coefficient.

$$
n = \frac{1}{|q \cdot R_H|}
$$

### Differential Voltage Mode

When the "Differential" option is enabled, the measured voltage is assumed to be twice the single-field Hall voltage. The formula for the Hall Coefficient is adjusted accordingly:

$$
R_H = \frac{V_{H(\text{diff})} \cdot t}{2 \cdot I \cdot B}
$$

**Where:**

| Symbol             | Description                                   |
| ------------------ | --------------------------------------------- |
| $V_H$              | Hall Voltage                                  |
| $R_H$              | Hall Coefficient                              |
| $I$                | Current through the material                  |
| $B$                | Magnetic field perpendicular to the current   |
| $t$                | Material thickness                            |
| $n$                | Carrier density                               |
| $q$                | Elementary charge ($1.602 \times 10^{-19}$ C) |

***

## Parameters

The calculator is divided into two main sections:

| Experimental Setup   | Material Properties      |
| -------------------- | ------------------------ |
| Current (I)          | Carrier Density (n)      |
| Magnetic Field (B)   | Hall Coefficient (R_H)   |
| Thickness (t)        |                          |
| Hall Voltage (V_H)   |                          |

***

## Technical Implementation

-   **Frontend**: Built with vanilla JavaScript, HTML5, and CSS.
-   **Styling**: Uses [Tailwind CSS](https://tailwindcss.com/)
