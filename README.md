# Nous - 3D Logo Interpreter

A web-based Logo turtle graphics interpreter with 2D and 3D support, built with TypeScript and Three.js.

Branched from the [Slogo 3d branch](https://github.com/lawless-m/Slogo/tree/3d).

## Features

- **2D Logo Graphics** - Classic turtle graphics with SVG rendering
- **3D Support** - Full 3D turtle movement with Three.js rendering
- **3D Coordinate Queries** - `XCOR`, `YCOR`, and `ZCOR` functions
- **3D Primitives** - Sphere, cube, cylinder, and custom mesh creation
- **CSG Operations** - Boolean operations on 3D meshes (union, subtract, intersect)
- **STL Export** - Export 3D models as STL files
- **Modern TypeScript** - Modular architecture with type safety

## New in This Version

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

### Install Dependencies

```bash
npm install
```

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

Output will be in the `dist/` directory.

### Development Mode

Watch for changes and rebuild automatically:

```bash
npm run watch
```

### Run Locally

Open `index.html` in a web browser, or use a local server:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

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
- `BEGINFACE` / `ENDFACE` - Create custom filled face

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
