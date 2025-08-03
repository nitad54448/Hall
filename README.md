# Interactive Hall Effect Calculator

A responsive web-based calculator for computing Hall effect parameters in semiconductor materials. This tool allows interactive exploration of the relationship between experimental setup variables and resulting material properties.

## Key Features
- **Real-time bidirectional calculations**
- **Unit conversions** (A/mA/µA, T/mT/G, m/cm/mm/µm, V/mV/µV)
- **AC/DC modes** (peak/rms)
- **Differential measurement** option
- **Interactive sliders** with logarithmic scaling
- Responsive mobile-friendly design

## Equations

### Hall Voltage Calculation
```math
V_H = \frac{R_H \cdot I \cdot B}{t}

Hall Coefficient
R_H = \frac{V_H \cdot t}{I \cdot B}

Carrier Density
n = \frac{1}{|R_H| \cdot q}

Differential Mode
V_{H(diff)} = V_H(+B) - V_H(-B) = 2 \cdot \frac{R_H \cdot I \cdot B}{t}

Where:

V_H = Hall voltage

R_H = Hall coefficient

I = Current

B = Magnetic field

t = Material thickness

n = Carrier density

q = Elementary charge (1.602 × 10⁻¹⁹ C)

Parameters
Experimental Setup	Material Properties
Current (I)	Carrier Density (n)
Magnetic Field (B)	Hall Coefficient (R_H)
Thickness (t)	
Hall Voltage (V_H)	
Technical Implementation
Built with vanilla JavaScript

Uses Tailwind CSS for styling

Responsive grid layout

Logarithmic slider scaling

Real-time unit conversion system

text
