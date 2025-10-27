# BEGINFACE / ENDFACE - Complete Guide

## Overview

`BEGINFACE` and `ENDFACE` are powerful commands for creating custom filled 3D polygons (faces) in the 3D Logo environment. They work by recording the turtle's positions as it moves, then creating a filled face connecting all those points.

## How It Works

### The Process

1. **`BEGINFACE`** - Starts recording vertices
   - Records current turtle position as the first vertex
   - Prepares to track all subsequent movements

2. **Turtle Movement** - Record vertices
   - Each `FORWARD`, `SETXYZ`, or position change adds a new vertex
   - Works with any 3D movement: `UP`, `DOWN`, `ROLLRIGHT`, `ROLLLEFT`
   - Rotation commands (`LEFT`, `RIGHT`) don't add vertices

3. **`ENDFACE`** - Creates the face
   - Connects all recorded vertices into a filled polygon
   - Uses current pen color (`SETPENCOLOR`)
   - Adds the face to the 3D scene

### Requirements

- **Minimum 3 vertices** - Need at least a triangle
- **3D mode** - Only works in 3D environment (always active in Nous)
- **Pen color** - Face uses the current pen color
- **Double-sided** - Faces are visible from both front and back

## Basic Examples

### Triangle (3 vertices)

```logo
SETPENCOLOR 255 0 0  ; Red
BEGINFACE
FORWARD 100
LEFT 120
FORWARD 100
LEFT 120
FORWARD 100
ENDFACE
```

### Square (4 vertices)

```logo
SETPENCOLOR 0 255 0  ; Green
BEGINFACE
REPEAT 4 [
    FORWARD 80
    LEFT 90
]
ENDFACE
```

### Pentagon (5 vertices)

```logo
SETPENCOLOR 0 0 255  ; Blue
BEGINFACE
REPEAT 5 [
    FORWARD 60
    LEFT 72  ; 360 / 5 = 72 degrees
]
ENDFACE
```

### Hexagon (6 vertices)

```logo
SETPENCOLOR 255 255 0  ; Yellow
BEGINFACE
REPEAT 6 [
    FORWARD 50
    LEFT 60  ; 360 / 6 = 60 degrees
]
ENDFACE
```

## 3D Examples

### Tilted Face (using UP/DOWN)

```logo
SETPENCOLOR 255 0 255  ; Magenta
UP 45  ; Tilt upward 45 degrees
BEGINFACE
REPEAT 4 [
    FORWARD 70
    LEFT 90
]
ENDFACE
```

### Vertical Face (90 degrees up)

```logo
SETPENCOLOR 100 200 100  ; Light green
UP 90  ; Face straight up (like a wall)
BEGINFACE
FORWARD 100
LEFT 90
FORWARD 150
LEFT 90
FORWARD 100
LEFT 90
FORWARD 150
ENDFACE
```

### Complex 3D Path

```logo
SETPENCOLOR 150 150 255  ; Light blue
BEGINFACE
FORWARD 50
UP 30
FORWARD 50
LEFT 60
FORWARD 50
DOWN 20
FORWARD 50
ENDFACE
```

## Building Complex Structures

### Cube (6 faces)

```logo
TO CUBE :size
    ; Bottom face
    SETPENCOLOR 200 200 200
    BEGINFACE
    REPEAT 4 [FORWARD :size LEFT 90]
    ENDFACE

    ; Top face
    SETZ :size
    SETPENCOLOR 180 180 180
    BEGINFACE
    REPEAT 4 [FORWARD :size LEFT 90]
    ENDFACE
    SETZ 0

    ; Four side faces
    REPEAT 4 [
        UP 90
        SETPENCOLOR 160 160 160
        BEGINFACE
        FORWARD :size
        LEFT 90
        FORWARD :size
        LEFT 90
        FORWARD :size
        LEFT 90
        FORWARD :size
        ENDFACE
        DOWN 90
        FORWARD :size
        LEFT 90
    ]
END
```

### Pyramid

```logo
TO PYRAMID :size :height
    LOCAL "apex_x
    LOCAL "apex_y
    LOCAL "apex_z

    ; Calculate apex position (center, elevated)
    MAKE "apex_x (:size / 2)
    MAKE "apex_y (:size / 2)
    MAKE "apex_z :height

    ; Base
    SETPENCOLOR 200 150 100
    BEGINFACE
    REPEAT 4 [FORWARD :size LEFT 90]
    ENDFACE

    ; Four triangular sides
    REPEAT 4 [
        SETPENCOLOR 180 130 80
        BEGINFACE
        FORWARD :size
        SETXYZ :apex_x :apex_y :apex_z
        ENDFACE

        ; Move to next corner
        SETXYZ XCOR YCOR 0
        LEFT 90
    ]
END
```

### Rectangle Helper

```logo
TO RECTFACE :width :height
    BEGINFACE
    FORWARD :width
    LEFT 90
    FORWARD :height
    LEFT 90
    FORWARD :width
    LEFT 90
    FORWARD :height
    ENDFACE
END

; Usage:
SETPENCOLOR 255 0 0
RECTFACE 100 50
```

## Tips and Best Practices

### 1. Plan Your Vertices

Before using `BEGINFACE`, plan out your polygon:
- How many sides?
- What angles?
- Regular or irregular?

### 2. Use Procedures for Reusable Shapes

```logo
TO TRIANGLE :size
    BEGINFACE
    REPEAT 3 [FORWARD :size LEFT 120]
    ENDFACE
END
```

### 3. Color Coding

Use different colors for different parts:
```logo
SETPENCOLOR 100 100 100  ; Gray for floors
SETPENCOLOR 200 150 100  ; Tan for walls
SETPENCOLOR 150 50 50    ; Dark red for roofs
```

### 4. Combine with Primitives

Mix `BEGINFACE/ENDFACE` with `SPHERE`, `CUBE`, `CYLINDER`:
```logo
; Base platform
BEGINFACE
REPEAT 8 [FORWARD 50 LEFT 45]
ENDFACE

; Add spheres at corners
REPEAT 8 [
    SPHERE 10
    FORWARD 50
    LEFT 45
]
```

### 5. Use SETXYZ for Complex Paths

```logo
BEGINFACE
SETXYZ 0 0 0
SETXYZ 100 0 0
SETXYZ 100 100 50
SETXYZ 0 100 50
ENDFACE
```

## Common Mistakes

### ❌ Not Enough Vertices

```logo
BEGINFACE
FORWARD 100
LEFT 90
ENDFACE
; Error: Need at least 3 vertices!
```

### ✅ Correct:

```logo
BEGINFACE
FORWARD 100
LEFT 90
FORWARD 100
LEFT 90
FORWARD 100
ENDFACE
```

### ❌ Forgetting to Set Color

```logo
BEGINFACE
REPEAT 4 [FORWARD 50 LEFT 90]
ENDFACE
; Face will be default color (black)
```

### ✅ Correct:

```logo
SETPENCOLOR 255 0 0  ; Set color BEFORE BEGINFACE
BEGINFACE
REPEAT 4 [FORWARD 50 LEFT 90]
ENDFACE
```

### ❌ Not Closing the Loop

```logo
BEGINFACE
FORWARD 100
LEFT 90
FORWARD 100
; Forgot to complete the shape
ENDFACE
```

### ✅ Correct:

```logo
BEGINFACE
FORWARD 100
LEFT 90
FORWARD 100
LEFT 90
FORWARD 100
LEFT 90
FORWARD 100
ENDFACE
```

## Advanced Techniques

### Curved Surfaces (approximation)

```logo
TO CURVED_FACE :radius :segments
    BEGINFACE
    REPEAT :segments [
        FORWARD (:radius * 2 * 3.14159 / :segments)
        LEFT (360 / :segments)
    ]
    ENDFACE
END

; Create a circular face with 20 segments
SETPENCOLOR 100 150 255
CURVED_FACE 50 20
```

### Textured Patterns

```logo
; Checkerboard pattern
REPEAT 4 [
    REPEAT 4 [
        SETPENCOLOR (REPCOUNT % 2) * 255 (REPCOUNT % 2) * 255 (REPCOUNT % 2) * 255
        BEGINFACE
        REPEAT 4 [FORWARD 25 LEFT 90]
        ENDFACE
        FORWARD 25
    ]
    SETXY -100 (YCOR + 25)
]
```

### Multi-Level Structures

```logo
TO TOWER :levels :size
    REPEAT :levels [
        SETPENCOLOR (200 - REPCOUNT * 20) 100 50
        REPEAT 4 [
            UP 90
            BEGINFACE
            REPEAT 4 [FORWARD :size LEFT 90]
            ENDFACE
            DOWN 90
            LEFT 90
        ]
        SETZ (ZCOR + :size)
    ]
END
```

## Export and Use

### Export as STL

After creating faces:
1. Click "Export STL" button
2. Save the file
3. Use in 3D modeling software or for 3D printing

### View and Manipulate

- **Rotate:** Click and drag with mouse
- **Zoom:** Scroll wheel
- **Pan:** Right-click and drag

## Example Files

Check out these complete examples:
- `examples/beginface-endface.logo` - Basic examples
- `examples/3d-house.logo` - Complete 3D house
- `examples/3d-shapes.logo` - Shape primitives

## Reference

### BEGINFACE

**Syntax:** `BEGINFACE`

**Description:** Starts recording vertices for a custom face

**Parameters:** None

**Returns:** Nothing

**Example:**
```logo
BEGINFACE
FORWARD 50
LEFT 90
FORWARD 50
ENDFACE
```

### ENDFACE

**Syntax:** `ENDFACE`

**Description:** Creates a filled face from recorded vertices

**Parameters:** None

**Returns:** Nothing (adds mesh to scene)

**Requires:** At least 3 vertices recorded since BEGINFACE

**Color:** Uses current pen color

**Example:**
```logo
SETPENCOLOR 255 0 0
BEGINFACE
REPEAT 6 [FORWARD 40 LEFT 60]
ENDFACE
```

## See Also

- `SPHERE` - Create spherical primitive
- `CUBE` - Create cube primitive
- `CYLINDER` - Create cylinder primitive
- `SETPENCOLOR` - Set face color
- `XCOR`, `YCOR`, `ZCOR` - Query position
- `SETXYZ` - Set position directly

---

**Happy 3D modeling!** 🐢✨

For more examples and tutorials, see the `examples/` directory.
