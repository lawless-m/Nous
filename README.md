# Nous - 3D Logo Interpreter

A web-based 3D Logo turtle graphics interpreter built with TypeScript and Three.js.

Branched from the [Slogo 3d branch](https://github.com/lawless-m/Slogo/tree/3d).

## Features

- **3D-Only Mode** - Fully immersive 3D turtle graphics environment
- **3D Turtle Movement** - Full 3D navigation with heading, pitch, and roll
- **3D Coordinate Queries** - `XCOR`, `YCOR`, and `ZCOR` functions
- **3D Primitives** - Sphere, cube, cylinder, and custom mesh creation
- **CSG Operations** - Boolean operations on 3D meshes (union, subtract, intersect)
- **STL Export** - Export 3D models as STL files for 3D printing
- **Modern TypeScript** - Modular architecture with type safety
- **Orbit Controls** - Interactive 3D view with mouse controls

## New in This Version

### ✅ 3D-Only Mode
The interpreter now starts in 3D mode by default with no 2D/3D toggle. This is a dedicated 3D Logo environment:
- Immediate 3D canvas on startup
- Full 3D coordinate display (X, Y, Z, Heading, Pitch, Roll)
- Always-visible STL export button
- Simplified interface focused on 3D graphics

### ✅ ZCOR Function
Complementing `XCOR` and `YCOR`, the new `ZCOR` function returns the turtle's Z coordinate:

```logo
SETZ 100
PRINT ZCOR      ; Outputs: 100

SETXYZ 10 20 30
PRINT XCOR      ; Outputs: 10
PRINT YCOR      ; Outputs: 20
PRINT ZCOR      ; Outputs: 30
```

### ✅ TypeScript Refactoring
The project has been migrated to TypeScript with a modular architecture:

```
src/
├── exceptions.ts        - Custom exception classes
├── types.ts            - Shared type definitions
├── turtle-state.ts     - Turtle state management
├── tokenizer.ts        - Logo language tokenizer
├── output-formatter.ts - Output and error formatting
├── viewport.ts         - Zoom and pan management
└── logo-interpreter.ts - Main interpreter
```

## Setup and Development

### Option 1: Automatic Build with GitHub Actions ⭐ Recommended

GitHub Actions will automatically build the TypeScript when you push changes:

1. Push your changes to any branch
2. GitHub Actions runs `npm run build` automatically
3. The built `dist/` files are committed back to your branch
4. Pull the latest changes to get the built files

**No local setup required!** Just edit the TypeScript files and push.

### Option 2: Build Locally

If you want to build on your local machine:

#### Install Dependencies

```bash
npm install
```

#### Build Once

Compile TypeScript to JavaScript:

```bash
npm run build
```

Output will be in the `dist/` directory.

#### Development Mode

Watch for changes and rebuild automatically:

```bash
npm run watch
```

### Run Locally

Open `index.html` in a web browser, or use a local server:

```bash
python3 -m http.server 8080
# or
npx http-server
```

Then visit http://localhost:8080

### GitHub Pages Deployment

The project is also configured to deploy to GitHub Pages automatically when you push to `main`:

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select "GitHub Actions"
4. Push to `main` branch
5. Your app will be live at `https://[username].github.io/Nous/`

## Logo Commands

### 2D Movement
- `FORWARD n` / `FD n` - Move forward
- `BACKWARD n` / `BK n` - Move backward
- `LEFT n` / `LT n` - Turn left (degrees)
- `RIGHT n` / `RT n` - Turn right (degrees)
- `HOME` - Return to origin
- `SETXY x y` - Move to position
- `SETX x` - Set X coordinate
- `SETY y` - Set Y coordinate

### 3D Movement
- `UP n` - Pitch up (degrees)
- `DOWN n` / `DN n` - Pitch down (degrees)
- `ROLLRIGHT n` / `RR n` - Roll right (degrees)
- `ROLLLEFT n` / `RL n` - Roll left (degrees)
- `SETZ z` - Set Z coordinate
- `SETXYZ x y z` - Set 3D position

### Query Functions
- `XCOR` - Get X coordinate
- `YCOR` - Get Y coordinate
- `ZCOR` - Get Z coordinate ⭐ NEW
- `HEADING` - Get heading angle
- `PENDOWN?` - Check if pen is down
- `PENSIZE` - Get pen size
- `PENCOLOR` - Get pen color

### 3D Shapes
- `SPHERE radius` - Create sphere
- `CUBE size` - Create cube
- `CYLINDER radius height` - Create cylinder

### Custom 3D Faces
**`BEGINFACE` / `ENDFACE`** - Create custom filled 3D polygons

Create custom filled faces (polygons) by recording turtle movements:

1. **`BEGINFACE`** - Start recording vertices
2. Move the turtle with `FORWARD`, `LEFT`, `RIGHT`, etc.
3. Each position is added as a vertex
4. **`ENDFACE`** - Create filled face from all recorded vertices

**Requirements:**
- Minimum 3 vertices (triangle)
- Works with any 3D turtle movement (`UP`, `DOWN`, `ROLL`)
- Uses current pen color (`SETPENRGB` or `SETPENCOLOR`)
- Faces are double-sided (visible from both angles)

**Example - Simple Triangle:**
```logo
SETPENRGB 255 0 0  ; Red
BEGINFACE
FORWARD 100
LEFT 120
FORWARD 100
LEFT 120
FORWARD 100
ENDFACE
```

**Example - 3D Tilted Square:**
```logo
UP 45                ; Tilt upward
SETPENRGB 0 255 0  ; Green
BEGINFACE
REPEAT 4 [
    FORWARD 80
    LEFT 90
]
ENDFACE
```

**Example - Pentagon:**
```logo
SETPENRGB 0 0 255  ; Blue
BEGINFACE
REPEAT 5 [
    FORWARD 60
    LEFT 72  ; 360/5 = 72 degrees
]
ENDFACE
```

**Pro Tip:** Create complex 3D structures by combining multiple faces:
```logo
; Create a pyramid
TO PYRAMID :size
    ; Base
    BEGINFACE
    REPEAT 4 [FORWARD :size LEFT 90]
    ENDFACE

    ; Four triangular sides
    REPEAT 4 [
        BEGINFACE
        FORWARD :size
        LEFT 90
        FORWARD :size
        SETXYZ (XCOR + :size/2) (YCOR + :size/2) (ZCOR + :size)
        ENDFACE
        RIGHT 90
    ]
END
```

See `examples/beginface-endface.logo` and `examples/3d-house.logo` for complete examples.

### CSG Operations
- `UNION mesh1 mesh2` - Boolean union
- `SUBTRACT mesh1 mesh2` - Boolean subtraction
- `INTERSECT mesh1 mesh2` - Boolean intersection

## Example: Testing ZCOR

```logo
; 2D coordinates
HOME
PRINT [X:] XCOR [Y:] YCOR [Z:] ZCOR
; Output: X: 0 Y: 0 Z: 0

; Move in 3D space
SETZ 50
FORWARD 100
PRINT [Z:] ZCOR
; Output: Z: 50

; Set 3D position
SETXYZ 10 20 30
PRINT [Position:] XCOR YCOR ZCOR
; Output: Position: 10 20 30
```

## Architecture

The interpreter follows a modular design:

1. **Tokenizer** - Parses Logo source code into tokens
2. **Expression Parser** - Evaluates arithmetic and logical expressions
3. **Command Executor** - Dispatches and executes Logo commands
4. **Turtle State** - Manages turtle position, heading, pen state, variables
5. **Graphics Renderers** - 2D (SVG) and 3D (Three.js) rendering
6. **Viewport** - Zoom, pan, and coordinate transformations

## Future Improvements

Potential areas for further refactoring:

- [ ] Extract 2D graphics module
- [ ] Extract 3D graphics module
- [ ] Extract expression parser module
- [ ] Break down command executor into smaller handlers
- [ ] Add comprehensive type definitions (remove `@ts-nocheck`)
- [ ] Add unit tests
- [ ] Add JSDoc documentation

## Contributing

This project is a work in progress. Contributions welcome!

## License

MIT
