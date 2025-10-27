# 3D Logo Examples

This directory contains example Logo programs demonstrating various features of the Nous 3D Logo interpreter.

## Example Files

### 🔺 beginface-endface.logo
**Complete guide to creating custom 3D faces**

Learn how to use `BEGINFACE` and `ENDFACE` to create custom filled polygons:

- **Example 1:** Red triangle (3 vertices)
- **Example 2:** Green square (4 vertices)
- **Example 3:** Blue pentagon (5 vertices)
- **Example 4:** Yellow tilted triangle (using UP/DOWN)
- **Example 5:** Magenta hexagon (6 vertices)
- **Example 6:** Multi-face pyramid

Each example includes explanatory comments and demonstrates key concepts.

**What you'll learn:**
- How vertex recording works
- Creating regular polygons
- 3D orientation with UP/DOWN
- Combining multiple faces
- Color control with SETPENCOLOR

### 🏠 3d-house.logo
**Build a complete 3D house from scratch**

A comprehensive example showing how to construct complex 3D structures:

**Features:**
- Gray floor foundation
- 4 tan walls with door opening
- Dark red sloped roof with gables
- Brown door
- Light blue windows (front and side)
- Brick red chimney

**Techniques demonstrated:**
- RECTFACE helper procedure
- Wall construction with BEGINFACE/ENDFACE
- Creating openings (doors, windows)
- Sloped surfaces (roof)
- Multi-component structures
- Color-coded parts

**Total faces:** ~20+ individual polygons

### 🌀 3d-spiral.logo
**3D spiral patterns**

Demonstrates 3D movement commands:

- Spiral going upward using UP and RIGHT
- Spiral with roll using DOWN, ROLLRIGHT, and LEFT
- Position tracking with XCOR, YCOR, ZCOR
- Creating dynamic 3D paths

**Commands featured:**
- FORWARD, UP, DOWN
- ROLLRIGHT, ROLLLEFT
- LEFT, RIGHT
- ZCOR coordinate queries

### 📦 3d-shapes.logo
**3D primitive shapes and positioning**

Shows how to use built-in 3D primitives:

- SPHERE - Create spheres
- CUBE - Create cubes
- CYLINDER - Create cylinders
- SETXYZ - Position shapes in 3D space
- Vertical stacking (tower example)

**What you'll learn:**
- Using primitive shapes
- 3D coordinate system
- SETXYZ positioning
- Building structures by stacking
- ZCOR coordinate tracking

### 🧪 test-zcor.logo
**Test the ZCOR function**

Simple test program for the ZCOR coordinate function:

- Test ZCOR in default position (Z=0)
- Test after SETZ command
- Test after SETXYZ command
- Verify coordinate queries work correctly

**Good for:**
- Verifying installation
- Learning coordinate system
- Testing XCOR, YCOR, ZCOR functions

## Quick Start

1. **Open Nous in your browser**
   - Open `index.html` locally
   - Or visit the GitHub Pages deployment

2. **Load an example**
   - Copy the contents of any `.logo` file
   - Paste into the code editor
   - Click "Run"

3. **Explore the 3D view**
   - **Rotate:** Click and drag
   - **Zoom:** Scroll wheel
   - **Pan:** Right-click and drag

4. **Export your creation**
   - Click "Export STL" button
   - Save for 3D printing or modeling software

## Learning Path

### Beginner
1. Start with `test-zcor.logo` - Learn coordinates
2. Try `3d-shapes.logo` - Understand primitives
3. Explore `3d-spiral.logo` - Practice 3D movement

### Intermediate
4. Study `beginface-endface.logo` - Learn custom faces
5. Experiment with colors and sizes
6. Create your own simple structures

### Advanced
7. Analyze `3d-house.logo` - Complex structures
8. Read `BEGINFACE-GUIDE.md` - Deep dive
9. Build your own 3D models!

## Tips for Writing 3D Logo

### Plan Your Structure
Before coding, sketch your design:
- What shapes do you need?
- What colors?
- How are parts positioned?

### Use Procedures
Break complex shapes into reusable procedures:
```logo
TO WALL :width :height
    UP 90
    BEGINFACE
    REPEAT 4 [
        FORWARD :width
        LEFT 90
        FORWARD :height
        LEFT 90
    ]
    ENDFACE
    DOWN 90
END
```

### Test Incrementally
Build and test one part at a time:
1. Create one wall → Run → Check
2. Add roof → Run → Check
3. Add details → Run → Check

### Use PRINT for Debugging
Track your position:
```logo
PRINT [Current position:] XCOR YCOR ZCOR
PRINT [Heading:] HEADING [Pitch:] PITCH
```

### Color Code Components
Use consistent colors for parts:
```logo
SETPENCOLOR 150 150 150  ; Floors - Gray
SETPENCOLOR 200 150 100  ; Walls - Tan
SETPENCOLOR 150 50 50    ; Roofs - Dark Red
SETPENCOLOR 100 200 255  ; Windows - Light Blue
```

## Resources

- **BEGINFACE-GUIDE.md** - Complete reference for custom faces
- **README.md** - Main project documentation
- **SETUP.md** - Installation and setup guide

## Contributing Examples

Have a cool 3D Logo creation? Contributions welcome!

1. Create your `.logo` file in `examples/`
2. Add clear comments explaining the code
3. Include a description in this README
4. Submit a pull request

## License

Examples are provided as educational material under the same license as the main project.

---

**Happy 3D modeling with Logo!** 🐢✨

Explore, experiment, and create amazing 3D structures!
