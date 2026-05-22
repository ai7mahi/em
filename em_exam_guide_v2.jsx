import { useState, useEffect, useRef } from "react";

const TOPICS = [
  { tag:"VEC",  name:"Vector Analysis (Div/Stokes/Identities/Transforms)", freq:7, color:"#3C3489", bg:"#EEEDFE", day:1 },
  { tag:"GAUS", name:"Gauss's Law + E-field Distributions",     freq:7, color:"#3C3489", bg:"#EEEDFE", day:1 },
  { tag:"DIP",  name:"Electric Dipole (E, V, Torque, PE, SHM)",  freq:7, color:"#3C3489", bg:"#EEEDFE", day:1 },
  { tag:"CAP",  name:"Capacitors + Dielectrics + Energy Grids",  freq:7, color:"#0C447C", bg:"#E6F1FB", day:2 },
  { tag:"RC",   name:"RC Circuit Transients + Conduction Models",freq:7, color:"#0C447C", bg:"#E6F1FB", day:2 },
  { tag:"HALL", name:"Hall Effect + Thompson apparatus e/m",     freq:6, color:"#0C447C", bg:"#E6F1FB", day:2 },
  { tag:"BIOT", name:"Biot-Savart + Solenoid + Ampere's Law",   freq:7, color:"#085041", bg:"#E1F5EE", day:3 },
  { tag:"FORC", name:"Magnetic Force + Cyclotron Path Match",   freq:6, color:"#085041", bg:"#E1F5EE", day:3 },
  { tag:"FAR",  name:"Faraday's Law + Induced Loops + LR Circuit",freq:5, color:"#712B13", bg:"#FAECE7", day:4 },
  { tag:"IND",  name:"Inductance + LC Harmonic Oscillations",    freq:7, color:"#712B13", bg:"#FAECE7", day:4 },
  { tag:"MATL", name:"Magnetic Materials + Hysteresis Loops",   freq:6, color:"#633806", bg:"#FAEEDA", day:5 },
  { tag:"KIRCH",name:"Kirchhoff's Laws + Network Matrices",     freq:3, color:"#27500A", bg:"#EAF3DE", day:2 },
  { tag:"MAXW", name:"Maxwell's Equations + Vector Wave Proofs",freq:2, color:"#27500A", bg:"#EAF3DE", day:5 },
];

const DAYS_DATA = [
  { day:1, title:"Electrostatics — Foundation", hours:8, color:"#3C3489", bg:"#EEEDFE",
    tags:["VEC","GAUS","DIP"],
    sessions:[
      {
        name:"Vector Analysis + Theorems", hrs:2.5, mins:150,
        subtopics: [
          { name: "Divergence Theorem (Gauss) — Statement, Rectangular Form & Physical Meaning", mins: 25 },
          { name: "Stokes' Theorem — Vector Formulation, Boundary line vs Surface mapping", mins: 25 },
          { name: "Green's Theorem in the Plane — Vector notation & physical interpretation", mins: 20 },
          { name: "Volume of Parallelepiped validation using Scalar Triple Product V = |A·(B×C)|", mins: 15 },
          { name: "Laplacian Operator (∇²) Expansion in Spherical Polar Coordinates (r, θ, φ)", mins: 20 },
          { name: "Vector Identity Proofs: ∇×(∇×A) = ∇(∇·A) − ∇²A and ∇×(∇φ) = 0, ∇·(∇×A) = 0", mins: 25 },
          { name: "Coordinate Transformations under spatial rotation and parity inversion", mins: 20 }
        ]
      },
      {
        name:"Gauss's Law + E-field distributions", hrs:2.5, mins:150,
        subtopics: [
          { name: "Deduction of Gauss's Law directly from Coulomb's Law with point charges", mins: 20 },
          { name: "Differential form of Gauss's Law (∇·E = ρ/ε₀) and conservative field limits", mins: 20 },
          { name: "Spherically Symmetric Charge Distributions: Field modeling for ρ(r) = ρ₀(1 - r²/a²)", mins: 30 },
          { name: "Thin Circular Ring: Axial E-field derivation and far-field point-charge limit (z ≫ R)", mins: 25 },
          { name: "Non-conducting Flat Disk: Field on the axis and infinite sheet limit (R → ∞)", mins: 25 },
          { name: "Coulomb force maximization for fractional split charges (q/Q = 0.5)", mins: 15 },
          { name: "Electric potential profiles from charged rods and potential-to-field gradients", mins: 15 }
        ]
      },
      {
        name:"Electric Dipole — E, V, Torque, PE", hrs:3, mins:180,
        subtopics: [
          { name: "Electric Dipole Definition, field lines for isolated charges vs dipoles", mins: 20 },
          { name: "Far-field potential derivation V = p cosθ / (4πε₀r²) via parallel approximation", mins: 35 },
          { name: "Electric field vectors at axial (θ=0°) and equatorial (θ=90°) coordinates", mins: 30 },
          { name: "Torque derivation τ = p × E and potential energy matrix U = -p·E", mins: 30 },
          { name: "Stable vs Unstable equilibrium analysis (θ = 0° vs 180° configurations)", mins: 20 },
          { name: "Work matrix calculations for turning a dipole 'end for end' inside uniform fields", mins: 20 },
          { name: "Simple Harmonic Motion of ring-constrained electron with frequency ω = √(eq/4πε₀mR³)", mins: 25 }
        ]
      },
    ],
    tip:"Vector analysis and coordinate transforms are heavily conceptual. Remember that the dipole potential V = p cosθ/(4πε₀r²) appears nearly every year, alongside axial and equatorial field scaling proofs." },
  { day:2, title:"Capacitors + Circuits", hours:8, color:"#0C447C", bg:"#E6F1FB",
    tags:["CAP","RC","HALL","KIRCH"],
    sessions:[
      {
        name:"Capacitors & Dielectric Boundary Media", hrs:2.5, mins:150,
        subtopics: [
          { name: "Capacitance definition and rigorous derivation for a Cylindrical Capacitor", mins: 30 },
          { name: "Spherical Capacitor exact solution and isolated sphere limit (b → ∞)", mins: 20 },
          { name: "Energy density formulation u_E = ½ε₀E² and parallel plate storage proofs", mins: 25 },
          { name: "Gauss's Law in Dielectrics, displacement vector D, and boundary proof ∇·D = ρ_free", mins: 25 },
          { name: "Slab insertion analysis (thickness t ≤ d, constant κ) in isolated systems", mins: 25 },
          { name: "Asymmetric Split Dielectrics: Solving multi-layer combinations (κ₁, κ₂, κ₃ networks)", mins: 25 }
        ]
      },
      {
        name:"RC Circuit transients & Conduction Models", hrs:2.5, mins:150,
        subtopics: [
          { name: "Differential Equation formulation for series RC loop charging under constant EMF", mins: 30 },
          { name: "Derivation of charge growth q(t) and exponential current decay i(t)", mins: 25 },
          { name: "Discharging transients, time constant τ = RC physical definition", mins: 20 },
          { name: "Logarithmic time horizons: calculating exact multiples of τ to charge up to 99.0%", mins: 25 },
          { name: "Microscopic conduction models: Current density J = n e v_d and Micro-Ohm's Law", mins: 25 },
          { name: "Classical free-electron theory: Proving metallic resistivity ρ ∝ √T", mins: 25 }
        ]
      },
      {
        name:"Hall Effect + Kirchhoff's Networks", hrs:3, mins:180,
        subtopics: [
          { name: "Hall Effect discovery, magnetic deflection mechanics and transverse field balancing", mins: 30 },
          { name: "Rigorous derivation of carrier concentration n = Bi / (V_H · e · t) on a strip", mins: 35 },
          { name: "Sign determination and carrier polarity matrix (positive vs negative bands)", mins: 25 },
          { name: "Kirchhoff's Laws (KCL, KVL) matching fundamental physical conservation laws", mins: 25 },
          { name: "Multi-loop passive and active network matrices (solving branch current equations)", mins: 35 },
          { name: "Biological battery systems (Electric Eels): Current rows and self-stunning paradox", mins: 30 }
        ]
      },
    ],
    tip:"RC transient differential equations are mandatory elements of the exam. Practice solving the 1st-order linear ODE from scratch. Combine Hall metrics with microscopic drift vectors." },
  { day:3, title:"Magnetostatics", hours:8, color:"#085041", bg:"#E1F5EE",
    tags:["BIOT","FORC"],
    sessions:[
      {
        name:"Biot-Savart Law & Axial Fields", hrs:3, mins:180,
        subtopics: [
          { name: "Biot-Savart law statement in vector format and cross-product geometric view", mins: 35 },
          { name: "Rigorous on-axis derivation for a circular loop: B(z) = μ₀IR²/[2(R²+z²)^(3/2)]", mins: 45 },
          { name: "Symmetry arguments for perpendicular cancellations around azimuthal loops", mins: 30 },
          { name: "Far-field magnetic dipole limit (z ≫ R) and dipole moment μ = I A definition", mins: 35 },
          { name: "Thompson's cross-field apparatus: Velocity selector balancing and e/m derivation", mins: 35 }
        ]
      },
      {
        name:"Ampere's Law + Solenoids + Toroids", hrs:3, mins:180,
        subtopics: [
          { name: "Ampere's Circuital Law boundary statement ∮B·dl = μ₀I_enc and constraints", mins: 35 },
          { name: "Constructing rectangular Amperian loops for an ideal infinitely long solenoid", mins: 40 },
          { name: "Proving B = μ₀nI inside the solenoid core and perfect cancellation outside", mins: 40 },
          { name: "Toroid fields derivation using circular loops and field fall-off across radial bands", mins: 35 },
          { name: "Internal field distributions inside thick conducting wires carrying uniform currents", mins: 30 }
        ]
      },
      {
        name:"Magnetic Force + Particle Dynamics", hrs:2, mins:120,
        subtopics: [
          { name: "Magnetic deflection force on a moving charge and vector lorentz formulation", mins: 25 },
          { name: "Derivation of magnetic force on macro current-carrying wire segments F = i L × B", mins: 30 },
          { name: "Cyclotron motion kinetics: orbit radius r = mv/(qB) and frequency derivations", mins: 20 },
          { name: "Isotope and particle orbit match problems (Proton vs Deuteron vs Alpha path matches)", mins: 25 },
          { name: "Torque on regular current loops τ = μ × B and potential energy system U = -μ·B", mins: 20 }
        ]
      },
    ],
    tip:"The loop axial field expression appears consistently. Perfect your geometry and integration tricks. Don't forget that magnetic fields perform zero work on isolated free charges." },
  { day:4, title:"Induction + Inductance", hours:7, color:"#712B13", bg:"#FAECE7",
    tags:["FAR","IND"],
    sessions:[
      {
        name:"Faraday's Law + Lenz's Law Mechanics", hrs:2, mins:120,
        subtopics: [
          { name: "Faraday's law of induction, definition of magnetic flux mutations over space", mins: 25 },
          { name: "Lenz's law physical basis as an expression of energy conservation principles", mins: 25 },
          { name: "Motional EMF generation across moving bars and induced track current loops", mins: 25 },
          { name: "Joule heating and thermal power loss metrics in inductive closed loops", mins: 25 },
          { name: "Eddy currents and Faraday disk induction profiles", mins: 20 }
        ]
      },
      {
        name:"Inductance Profiles + Magnetic Energetics", hrs:2.5, mins:150,
        subtopics: [
          { name: "Self-inductance definition L = N Φ / I and back-EMF coefficients", mins: 30 },
          { name: "Rigorous self-inductance derivation for a long solenoid: L = μ₀n²Al", mins: 35 },
          { name: "Mutual inductance definition M and structural symmetry verification (M₁₂ = M₂₁)", mins: 30 },
          { name: "Work derivation for storing magnetic energy U = ½LI² inside an inductor core", mins: 30 },
          { name: "Magnetic energy density formulation u_B = B²/(2μ₀) = ½B·H inside fields", mins: 25 }
        ]
      },
      {
        name:"LC Harmonic Oscillations + LR Loops", hrs:2.5, mins:150,
        subtopics: [
          { name: "Setting up KVL differential equations for a resistanceless LC tank circuit", mins: 30 },
          { name: "Solving the 2nd-order ODE to yield harmonic charge solutions q(t) = Q_max cos(ωt)", mins: 30 },
          { name: "Angular resonance frequency selection proof: ω = 1/√(LC)", mins: 20 },
          { name: "Interchanging field energy profiles (Capacitor Electric vs Inductor Magnetic fields)", mins: 35 },
          { name: "Transient current growth kinetics in series LR loops and magnetic time constants", mins: 35 }
        ]
      },
    ],
    tip:"LC energy conservation is a high-yield question. Treat the harmonic equations carefully and verify that the sum of electric and magnetic energies is constant over time." },
  { day:5, title:"Magnetic Materials + Revision", hours:7, color:"#633806", bg:"#FAEEDA",
    tags:["MATL","MAXW"],
    sessions:[
      {
        name:"Matter Magnetization Frameworks", hrs:2.5, mins:150,
        subtopics: [
          { name: "Macroscopic magnetization field vectors M, magnetic field intensities H, and vectors B", mins: 30 },
          { name: "Deriving the core constitutive field relationship: B = μ₀(H + M)", mins: 30 },
          { name: "Susceptibility translations χ_m and links to relative permeability μ_r = 1 + χ_m", mins: 25 },
          { name: "Atomic dipole sources: Spin Magnetic Moment vs Orbital Angular Momentum tracking", mins: 35 },
          { name: "Microscopic classification criteria: Diamagnetism, Paramagnetism, and Ferromagnetism", mins: 30 }
        ]
      },
      {
        name:"Hysteresis Loops + Curie Analytics", hrs:1.5, mins:90,
        subtopics: [
          { name: "Ferromagnetic domain dynamics, wall motion and alignment saturation benchmarks", mins: 20 },
          { name: "Hysteresis loop traces: Remanence B_r, Coercivity H_c, and Saturation curves", mins: 25 },
          { name: "Mathematical proof that closed loop area ∮H dB equals energy dissipation per volume", mins: 25 },
          { name: "Curie's Law for paramagnets (M = C H / T) and transition points (Curie Temp T_C)", mins: 20 }
        ]
      },
      {
        name:"Maxwell's Equations + Mock Trials", hrs:3, mins:180,
        subtopics: [
          { name: "Reviewing Maxwell's four equations in differential and integral layouts", mins: 35 },
          { name: "Divergence and curl identity combinations to decouple E and B wave equations", mins: 35 },
          { name: "Speed of light definition c = 1/√(μ₀ε₀) from Maxwell parameters", mins: 25 },
          { name: "Comprehensive paper review, past question matching, and numerical mock drills", mins: 85 }
        ]
      },
    ],
    tip:"Always remember to map loop area directly to heat dissipation via domain switching. Be prepared to differentiate between soft iron cores and hard permanent magnet materials." },
];

const QS = [
  {id:1,tag:"VEC",years:["2018","2019","2020","2022","2023"],marks:"4+4",
   q:"State the Divergence theorem and Stokes' theorem in words, vector form, and interpret each physically.",
   sol:`━━━ Divergence Theorem (Gauss's Theorem) ━━━
Statement: Net outward flux of a vector field F through a closed surface S is equal to the volume integral of the divergence of F over the volume V enclosed by S.
  ∯_S F·dA = ∭_V (∇·F) dV

Physical Interpretation:
"Total net outflow through a closed boundary = sum of sources (∇·F > 0) minus sinks (∇·F < 0) inside."
If a field is solenoidal (∇·F = 0), net flux through any closed boundary is identically zero.

━━━ Stokes' Theorem ━━━
Statement: The line integral of a vector field F around a closed loop C is equal to the surface integral of the curl of F over any open surface S bounded by the loop C.
  ∮_C F·dr = ∬_S (∇×F)·dA

Physical Interpretation:
"The macroscopic circulation of a field along a closed perimeter loop = sum of microscopic vortices (curls) throughout the interior surface."
If a field is irrotational (∇×F = 0), the line integral is path-independent, indicating a conservative field structure.`},

  {id:2,tag:"VEC",years:["2018","2022"],marks:"4",
   q:"Prove the vector identity: ∇×(∇×A) = ∇(∇·A) − ∇²A. How is this used in electrodynamics?",
   sol:`━━━ Proof (Using Levi-Civita and Index Notation) ━━━
Let's look at the i-th component of the curl of a curl:
[∇×(∇×A)]_i = ε_ijk ∂_j (ε_klm ∂_l A_m)
Since ε_ijk = ε_kij, we rewrite the product of densitites using Kronecker deltas:
ε_kij ε_klm = δ_il δ_jm − δ_im δ_jl
Substituting this back into the expression yields:
= (δ_il δ_jm − δ_im δ_jl) ∂_j ∂_l A_m
= ∂_j ∂_i A_j − ∂_j ∂_j A_i
= ∂_i (∂_j A_j) − (∂_j ∂_j) A_i

Converting this back to vector notation:
  ∇×(∇×A) = ∇(∇·A) − ∇²A  ◀ Proved.

━━━ Application in Electrodynamics ━━━
This identity is the key step to decoupling Maxwell's equations to discover electromagnetic waves. 
Taking the curl of Faraday's Law (∇×E = −∂B/∂t):
  ∇×(∇×E) = ∇×(−∂B/∂t) = −∂/∂t (∇×B)
Substitute our identity on the left side and the Ampere-Maxwell law (∇×B = μ₀ε₀ ∂E/∂t) on the right side:
  ∇(∇·E) − ∇²E = −∂/∂t (μ₀ε₀ ∂E/∂t)
Since free space has no charge distribution (∇·E = 0):
  0 − ∇²E = −μ₀ε₀ (∂²E/∂t²)  ⇒  ∇²E = μ₀ε₀ (∂²E/∂t²)
This represents a standard three-dimensional wave equation propagating at speed c = 1/√(μ₀ε₀).`},

  {id:3,tag:"VEC",years:["2023","2024"],marks:"3",
   q:"Show that if φ satisfies Laplace's equation ∇²φ = 0, then ∇φ is both a solenoidal and an irrotational vector field.",
   sol:`Let vector field V = ∇φ.

━━━ 1. Solenoidal Proof (∇·V = 0) ━━━
Compute the divergence of V:
  ∇·V = ∇·(∇φ) = ∇²φ
We are given that φ satisfies Laplace's equation, which means ∇²φ = 0.
  ∴ ∇·V = 0
Because its divergence is zero everywhere, the vector field V = ∇φ is solenoidal (has no isolated sources or sinks).

━━━ 2. Irrotational Proof (∇×V = 0) ━━━
Compute the curl of V:
  ∇×V = ∇×(∇φ)
In vector calculus, the curl of any gradient field is a mathematical identity that equals zero:
  [∇×(∇φ)]_i = ε_ijk ∂_j ∂_k φ = 0
(This holds because partial derivatives are symmetric ∂_j ∂_k = ∂_k ∂_j, while the Levi-Civita tensor ε_ijk is completely antisymmetric).
  ∴ ∇×V = 0
Because its curl is zero everywhere, the field V = ∇φ is irrotational (conservative).`},

  {id:4,tag:"VEC",years:["2023","2024"],marks:"3",
   q:"From Maxwell's equations in free space, show that E and B both satisfy the wave equation ∇²u = (1/c²)(∂²u/∂t²).",
   sol:`━━━ Maxwell's Equations in Free Space ━━━
1) ∇·E = 0
2) ∇·B = 0
3) ∇×E = −∂B/∂t
4) ∇×B = (1/c²) ∂E/∂t    [where c² = 1/(μ₀ε₀)]

━━━ Decoupling for E-field ━━━
Take the curl of equation (3):
  ∇×(∇×E) = ∇×(−∂B/∂t) = −∂/∂t (∇×B)
Apply the vector identity ∇×(∇×E) = ∇(∇·E) − ∇²E and substitute equation (4):
  ∇(∇·E) − ∇²E = −∂/∂t [ (1/c²) ∂E/∂t ]
Since ∇·E = 0 from equation (1), this simplifies to:
  0 − ∇²E = −(1/c²) (∂²E/∂t²)  ⇒  ∇²E = (1/c²) ∂²E/∂t²  ◀

━━━ Decoupling for B-field ━━━
Take the curl of equation (4):
  ∇×(∇×B) = (1/c²) ∂/∂t (∇×E)
Apply the vector identity and substitute equation (3):
  ∇(∇·B) − ∇²B = (1/c²) ∂/∂t [ −∂B/∂t ]
Since ∇·B = 0 from equation (2), this simplifies to:
  0 − ∇²B = −(1/c²) (∂²B/∂t²)  ⇒  ∇²B = (1/c²) ∂²B/∂t²  ◀
Both fields decouple into identical hyper-geometries propagating at speed c.`},

  {id:5,tag:"VEC",years:["2024"],marks:"4",
   q:"How do the components of a vector transform under a rotation and an inversion of coordinates?",
   sol:`━━━ 1. Coordinate Rotation ━━━
Consider a rotation of the coordinate axes around the z-axis by an angle θ. The old coordinates (x, y, z) map to new coordinates (x', y', z') via linear transformation rules:
  x' = x cosθ + y sinθ
  y' = -x sinθ + y cosθ
  z' = z
In general tensor shorthand, any true vector component A_i transforms according to the direction cosine matrices:
  A'_i = a_ij A_j  (where a_ij = ∂x'_i / ∂x_j)

━━━ 2. Spatial Inversion (Parity Operation) ━━━
Under a complete spatial inversion, all coordinate axes flip signs (x → -x, y → -y, z → -z), mapping the position vector r → -r.
Vectors are classified into two groups based on how they transform under inversion:
• Polar Vectors (True Vectors like Velocity v, Force F, Electric Field E): Change sign under inversion.
  A' = -A
• Axial Vectors (Pseudovectors like Angular Momentum L = r×p, Magnetic Field B = ∇×A): Do not change sign under inversion because they are cross products of two polar vectors, causing the double negative to cancel out.
  B' = +B`},

  {id:6,tag:"VEC",years:["2024"],marks:"3",
   q:"The theory of heat conduction leads to an equation ∇²ψ = k|∇φ|², where φ is a potential satisfying Laplace's equation: ∇²φ = 0. Show that a solution of this equation is ψ = ½ k φ².",
   sol:`We want to verify if ψ = ½ k φ² is a valid solution. Let's first compute the gradient of ψ:
  ∇ψ = ∇(½ k φ²)
Using the chain rule for gradients: ∇(f(φ)) = f'(φ) ∇φ
  ∇ψ = (½ k · 2φ) ∇φ = k φ ∇φ

Next, find the Laplacian by computing the divergence of this gradient field:
  ∇²ψ = ∇·(∇ψ) = ∇·(k φ ∇φ) = k [ ∇·(φ ∇φ) ]
Apply the vector product identity ∇·(f A) = f (∇·A) + ∇f · A, where f = φ and A = ∇φ:
  ∇²ψ = k [ φ ∇·(∇φ) + ∇φ · ∇φ ]
  ∇²ψ = k [ φ ∇²φ + |∇φ|² ]

We are given that φ satisfies Laplace's equation, so ∇²φ = 0. Substituting this in:
  ∇²ψ = k [ φ(0) + |∇φ|² ]
  ∇²ψ = k |∇φ|²
This matches the target differential equation exactly, proving that ψ = ½ k φ² is a valid solution.`},

  {id:7,tag:"VEC",years:["2024"],marks:"4",
   q:"Express Green's theorem in the plane in vector notation and interpret it physically.",
   sol:`━━━ Vector Notation ━━━
Green's Theorem in the plane states that:
  ∮_C (P dx + Q dy) = ∬_R (∂Q/∂x − ∂P/∂y) dx dy
To express this in vector notation, let's define a two-dimensional vector field F = P î + Q ĵ and a position increment vector dr = dx î + dy ĵ. The left-hand line integral becomes ∮_C F·dr.
The integrand on the right-hand side, (∂Q/∂x − ∂P/∂y), is exactly the z-component of the curl of F, which can be written as (∇ × F) · k̂.
Therefore, the vector notation is:
  ∮_C F·dr = ∬_R (∇ × F)·k̂ dA  ◀

━━━ Physical Interpretation ━━━
It states that the macroscopic net circulation of a vector field along a closed planar boundary path C is equal to the integral of the microscopic fluid spinning (vorticity or curl) summed over every point on the planar region R enclosed by that loop.`},

  {id:8,tag:"VEC",years:["2024"],marks:"4",
   q:"The magnetic field B is related to the vector potential A by B = ∇×A. Show that each side of the equation ∬_S B·dS = ∮_C A·dr is invariant under the gauge transformation A → A + ∇φ for a single-valued function φ.",
   sol:`Let's apply the gauge transformation A' = A + ∇φ.

━━━ Left-Hand Side Invariance (Flux of B) ━━━
Compute the transformed magnetic field B':
  B' = ∇ × A' = ∇ × (A + ∇φ) = ∇ × A + ∇ × (∇φ)
Since the curl of any gradient field is identically zero vector (∇×∇φ = 0):
  B' = ∇ × A = B
Since the field B remains unchanged under the transformation, the surface integral ∬_S B·dS is invariant.

━━━ Right-Hand Side Invariance (Circulation of A) ━━━
Compute the transformed line integral around the closed loop C:
  ∮_C A'·dr = ∮_C (A + ∇φ)·dr = ∮_C A·dr + ∮_C ∇φ·dr
According to the fundamental theorem of calculus for gradients, the line integral of a gradient depends only on its boundary values:
  ∮_C ∇φ·dr = φ(end-point) − φ(start-point)
Because C is a closed loop, the start and end points are identical. Since φ is single-valued, φ(end-point) = φ(start-point), meaning the integral vanishes:
  ∮_C ∇φ·dr = 0
  ∴ ∮_C A'·dr = ∮_C A·dr
Both sides are invariant under gauge transformations, proving that gauge choices have no effect on physical observables.`},

  {id:9,tag:"GAUS",years:["2018","2020","2021","2023"],marks:"4",
   q:"Derive Gauss's law from Coulomb's law. Give both integral and differential forms.",
   sol:`━━━ 1. Integral Form Derivation ━━━
Consider a point charge q located at the origin. Coulomb's Law gives the electric field at a distance r as:
  E = [ q / (4πε₀r²) ] r̂
The electric flux dΦ through a tiny area element dA on a surrounding shell is:
  dΦ = E · dA = [ q / (4πε₀r²) ] r̂ · n̂ dA = [ q / (4πε₀) ] · [ dA cosθ / r² ]
The term (dA cosθ / r²) is the definition of a differential solid angle dΩ.
  dΦ = [ q / (4πε₀) ] dΩ
Integrating over the entire closed surface area (total solid angle of a sphere is 4π):
  Φ = ∯_S E·dA = [ q / (4πε₀) ] ∮ dΩ = [ q / (4πε₀) ] · 4π = q / ε₀
By the principle of superposition, this holds for any collection of charges enclosed by a surface:
  ∯_S E·dA = Q_enc / ε₀  ◀ (Integral Form)

━━━ 2. Differential Form Derivation ━━━
Apply Gauss's Divergence Theorem to convert the surface integral into a volume integral:
  ∯_S E·dA = ∭_V (∇·E) dV
Express the enclosed charge as the volume integral of the charge density ρ:
  Q_enc = ∭_V ρ dV
Substitute both into the integral form:
  ∭_V (∇·E) dV = ∭_V (ρ / ε₀) dV
For this to hold true for any arbitrary volume V, the integrands must be equal everywhere:
  ∇·E = ρ/ε₀  ◀ (Differential Form)`},

  {id:10,tag:"GAUS",years:["2019","2022","2024"],marks:"5",
   q:"A thin circular non-conducting ring of radius R carries total charge q with uniform linear density λ. Derive the electric field at point P on its central axis, distance z from center. Check cases z ≫ R and z = 0.",
   sol:`━━━ Derivation ━━━
Consider a small charge element dq = λ dl = λ R dφ on the ring. The distance from this element to point P on the central axis is r = √(z² + R²).
The magnitude of the differential electric field from this element is:
  dE = dq / (4πε₀ r²) = [ λ R dφ ] / [ 4πε₀ (z² + R²) ]
By horizontal symmetry, components perpendicular to the central axis cancel out in pairs across the ring. Only the axial components along the z-axis add up:
  dE_z = dE cosθ
From geometry, cosθ = z / r = z / √(z² + R²). Substituting this back:
  dE_z = [ λ R z dφ ] / [ 4πε₀ (z² + R²)^{3/2} ]
Integrate around the loop from φ = 0 to 2π:
  E_z = [ λ R z / (4πε₀ (z² + R²)^{3/2}) ] ∫₀^{2π} dφ
  E_z = [ λ R z · 2π ] / [ 4πε₀ (z² + R²)^{3/2} ]
Since total charge q = λ (2πR):
  E = qz / [ 4πε₀ (z² + R²)^{3/2} ] ẑ  ◀

━━━ Limiting Cases ━━━
• At the center (z = 0): E = 0. This matches expectations due to perfect central cancellation.
• Far field (z ≫ R): We can neglect R² in the denominator: (z²+R²)^{3/2} ≈ (z²)^{3/2} = z³.
  E ≈ qz / [4πε₀ z³] = q / [4πε₀ z²]
The field simplifies to match a point charge, confirming the derivation.`},

  {id:11,tag:"GAUS",years:["2024"],marks:"4",
   q:"Assuming an electron is constrained to the central axis of a uniformly charged ring with z ≪ R, show that it undergoes harmonic oscillation and find its angular frequency ω.",
   sol:`From the previous derivation, the electric field along the ring's axis is:
  E(z) = qz / [ 4πε₀ (z² + R²)^{3/2} ]
Apply the approximation for small displacements z ≪ R by dropping the z² term in the denominator:
  (z² + R²)^{3/2} ≈ (R²)^{3/2} = R³
Therefore, the electric field simplifies linearly to:
  E(z) ≈ qz / [ 4πε₀ R³ ]
The restoring force acting on a negative electron (charge -e, mass m) along the axis is:
  F = -e E(z) = − [ e q / (4πε₀ R³) ] z
Using Newton's second law, F = m (d²z/dt²):
  m (d²z/dt²) + [ e q / (4πε₀ R³) ] z = 0
  d²z/dt² + [ e q / (4πε₀ m R³) ] z = 0
This matches the standard differential equation for a simple harmonic oscillator (d²z/dt² + ω²z = 0).
The angular frequency of the oscillation is:
  ω = √(eq / 4πε₀mR³)  ◀`},

  {id:12,tag:"GAUS",years:["2024","2023","2022"],marks:"5",
   q:"Find the electric field at distance z above the center of a flat non-conducting circular disk of radius R carrying uniform surface charge density σ. Check limits R → ∞, z ≫ R, and z = 0.",
   sol:`━━━ Derivation ━━━
Divide the disk into concentric rings of radius r and width dr. The charge on each ring is dq = σ dA = σ (2πr dr).
Using the ring formula derived earlier, the differential electric field dE on the axis from this ring element is:
  dE_z = [ z dq ] / [ 4πε₀ (z² + r²)^{3/2} ] = [ z σ 2πr dr ] / [ 4πε₀ (z² + r²)^{3/2} ] = [ σ z / (2ε₀) ] · [ r (z² + r²)^{−3/2} dr ]
Integrate from r = 0 to r = R:
  E_z = [ σ z / (2ε₀) ] ∫₀^R r (z² + r²)^{−3/2} dr
Let u = z² + r² → du = 2r dr. The integral becomes:
  ½ ∫ u^{−3/2} du = −u^{−½} = −1 / √(z² + r²)
Evaluating between the limits r = 0 and r = R:
  E_z = [ σ z / (2ε₀) ] [ −1/√(z² + R²) − (−1/z) ]
  E = [ σ / (2ε₀) ] [ 1 − z / √(z² + R²) ] ẑ  ◀

━━━ Limiting Cases ━━━
• Infinite Sheet (R → ∞): As R approaches infinity, the term z / √(z² + R²) goes to zero.
  E = σ / 2ε₀  (Matches the constant field of an infinite plane plane)
• Far Field (z ≫ R): Using binomial expansion, [1 + R²/z²]^{−½} ≈ 1 − ½ R²/z².
  E ≈ [σ / 2ε₀] [1 − (1 − ½ R²/z²)] = σ R² / (4ε₀ z²) = q / (4πε₀ z²) (Point charge behavior)
• At the origin (z = 0): E = 0, due to symmetric cancellation at the disk surface.`},

  {id:13,tag:"GAUS",years:["2023"],marks:"3",
   q:"Write down Coulomb's law. If a charge Q initially on a tiny sphere is partitioned into two parts, q and (Q - q), what ratio q/Q maximizes the electrostatic force between them?",
   sol:`━━━ 1. Coulomb's Law ━━━
The electrostatic force between two stationary point charges is directly proportional to the product of the magnitudes of the charges and inversely proportional to the square of the distance between them:
  F = [ 1 / (4πε₀) ] · [ q₁ q₂ / r² ]

━━━ 2. Force Maximization ━━━
Let the two partitioned charges be q₁ = q and q₂ = Q − q. At a fixed distance r, the force is:
  F(q) = [ 1 / (4πε₀ r²) ] · [ q (Q − q) ] = [ 1 / (4πε₀ r²) ] (qQ − q²)
To find the value of q that maximizes the force, take the derivative with respect to q and set it to zero:
  dF/dq = 0
  [ 1 / (4πε₀ r²) ] · [ Q − 2q ] = 0
Since the distance factor is non-zero:
  Q − 2q = 0  ⇒  Q = 2q
  ∴ q/Q = 1/2 = 0.5  ◀
Splitting the initial charge exactly in half (50% each) maximizes the repulsive force.`},

  {id:14,tag:"GAUS",years:["2023"],marks:"3",
   q:"The electric potential at points in an xy plane is given by V = (2 V/m²)x² - (3 V/m²)y². In unit-vector notation, what is the electric field at the point (3.0 m, 2.0 m)?",
   sol:`The relationship between the electric field and the electric potential is given by the negative gradient:
  E = −∇V = − [ (∂V/∂x) î + (∂V/∂y) ĵ ]

Compute the partial derivatives of V = 2x² − 3y²:
  ∂V/∂x = ∂/∂x (2x² − 3y²) = 4x
  ∂V/∂y = ∂/∂y (2x² − 3y²) = −6y

Substitute these derivatives back into the gradient formula:
  E = − [ 4x î − 6y ĵ ] = −4x î + 6y ĵ

Now, evaluate the electric field vector at the given coordinates x = 3.0 m and y = 2.0 m:
  E = −4(3.0) î + 6(2.0) ĵ
  E = −12.0 î + 12.0 ĵ V/m  ◀`},

  {id:15,tag:"GAUS",years:["2023","2021"],marks:"3",
   q:"Show that the electrostatic field is conservative and can be written as E = -∇V.",
   sol:`An electric field is conservative if the net work done in moving a charge around any closed loop is zero, meaning the path integral vanishes:
  ∮_C E·dr = 0
By Stokes' Theorem, we can relate this closed loop line integral to a surface integral of the curl:
  ∮_C E·dr = ∬_S (∇ × E)·dA = 0
For this integral to equal zero for any arbitrary surface area S, the integrand itself must be zero everywhere:
  ∇ × E = 0
From vector calculus, any vector field with a curl of zero can be written as the gradient of a scalar potential function φ. 
In physics, we define this using a negative sign so that positive work corresponds to moving from higher to lower potential:
  E = −∇V  ◀`},

  {id:16,tag:"DIP",years:["2018","2019","2020","2021","2022","2023","2024"],marks:"6",
   q:"Define electric dipole. Show that the potential at a far-field point is V = p cosθ/(4πε₀r²). Derive the E-field at an axial point (z >> d).",
   sol:`━━━ 1. Electric Dipole Definition ━━━
An electric dipole consists of two equal and opposite point charges (+q and −q) separated by a small distance d. The dipole moment vector is defined as p = q d, pointing from the negative charge toward the positive charge.

━━━ 2. Far-Field Potential Derivation (r ≫ d) ━━━
Let the dipole be centered at the origin along the z-axis. For a distant point P(r, θ), the distances to the individual charges are:
  r_₊ ≈ r − (d/2)cosθ
  r_₋ ≈ r + (d/2)cosθ
The total potential is the sum of the individual potentials:
  V = [ q / (4πε₀) ] [ 1/r_₊ − 1/r_₋ ] = [ q / (4πε₀) ] [ (r_₋ − r_₊) / (r_₊ r_₋) ]
Substitute the geometric approximations into the equation:
  r_₋ − r_₊ ≈ d cosθ   and   r_₊ r_₋ ≈ r²
  V ≈ [ q / (4πε₀) ] [ (d cosθ) / r² ] = [ q d cosθ ] / [ 4πε₀ r² ]
Since p = qd:
  V = p cosθ / (4πε₀ r²)  ◀

━━━ 3. Axial Electric Field (θ = 0°, r = z ≫ d) ━━━
Along the axis, cos(0°) = 1, so V = p / (4πε₀ z²). The electric field is the negative derivative:
  E = −dV/dz = − ∂/∂z [ p / (4πε₀ z²) ] = − [ p / (4πε₀) ] (−2 / z³)
  E = 2p / (4πε₀ z³)  ◀`},

  {id:17,tag:"DIP",years:["2019","2020","2022","2023"],marks:"6",
   q:"An electric dipole p is placed in a uniform field E. Derive (i) the torque τ on the dipole, and (ii) the potential energy U. Find stable and unstable equilibrium orientations.",
   sol:`━━━ 1. Torque Derivation ━━━
Consider a dipole oriented at an angle θ relative to a uniform electric field E. The forces acting on the charges are +qE and −qE, which are equal in magnitude and opposite in direction, creating a torque couple.
The perpendicular distance between the lines of action of the two forces is d sinθ.
  τ = Force × perpendicular distance = (qE) · (d sinθ) = (qd) E sinθ
Since the dipole moment is p = qd, the magnitude of the torque is τ = pE sinθ. In vector notation:
  τ = p × E  ◀

━━━ 2. Potential Energy Derivation ━━━
The work done by an external agent to rotate the dipole against the electric torque is:
  dW = τ dθ = pE sinθ dθ
Integrating from a neutral reference orientation of θ = 90° to an angle θ:
  U = ∫_{90°}^θ pE sinθ' dθ' = pE [ −cosθ' ]_{90°}^θ = −pE cosθ
In vector dot-product notation:
  U = −p·E  ◀

━━━ 3. Equilibrium Configurations ━━━
Equilibrium occurs when the torque is zero (τ = 0 → sinθ = 0):
• Stable Equilibrium (θ = 0°): The dipole moment p aligns parallel to the field E. The potential energy is at its minimum value (U = −pE), and any displacement generates a restoring torque.
• Unstable Equilibrium (θ = 180°): The dipole p points opposite to the field E. The potential energy is at its maximum value (U = +pE), and any displacement causes the dipole to rotate away.`},

  {id:18,tag:"GAUS",years:["2023"],marks:"5",
   q:"Find the electric potential at point P₁ from a thin plastic rod of length L and uniform positive charge Q lying on an x-axis, at a distance d from the rod's edge.",
   sol:`Let the rod lie along the x-axis from x = 0 to x = L. Point P₁ is on the axis at a distance d from the origin, located at x = −d.
Consider a small segment dx at position x along the rod. Its charge element is:
  dq = λ dx = (Q / L) dx
The distance from this charge element to the point P₁ is r = x − (−d) = x + d.
The potential dV at point P₁ due to this element is:
  dV = dq / (4πε₀ r) = [ (Q / L) dx ] / [ 4πε₀ (x + d) ]
Integrate across the entire length of the rod from x = 0 to x = L:
  V = [ Q / (4πε₀ L) ] ∫₀^L [ dx / (x + d) ]
  V = [ Q / (4πε₀ L) ] [ ln(x + d) ]₀^L
  V = [ Q / (4πε₀ L) ] [ ln(L + d) − ln(d) ]
  V = [ Q / (4πε₀ L) ] ln( (L + d) / d )  ◀

Given values from typical exam numbers (e.g., L = 12.0 cm, Q = 56.1 μC, d = 2.50 cm):
  V = [ (56.1 × 10^{−6}) × (8.99 × 10⁹) / 0.12 ] · ln( (12 + 2.5) / 2.5 )
  V = 4,202,825 × ln(5.8) = 4,202,825 × 1.75785 = 7.39 × 10⁶ Volts.`},

  {id:19,tag:"GAUS",years:["2022"],marks:"5",
   q:"A thin nonconducting rod of length L carries a total charge q spread uniformly along it. Show that E at point P at a distance y on the perpendicular bisector is given by E = q / [2πε₀ y √(L² + 4y²)].",
   sol:`Symmetrically center the rod along the x-axis from x = −L/2 to x = +L/2. Point P is on the y-axis at coordinates (0, y).
Consider a small charge element dq = λ dx = (q/L) dx at position x. The distance to point P is r = √(x² + y²).
The field magnitude from this element is:
  dE = dq / (4πε₀ r²) = [ q dx ] / [ 4πε₀ L (x² + y²) ]
By horizontal symmetry, the x-components from the left and right halves of the rod cancel each other out. Only the vertical y-components (dE_y = dE cosθ) survive, where cosθ = y / r = y / √(x² + y²).
  dE_y = [ q y dx ] / [ 4πε₀ L (x² + y²)^{3/2} ]
Integrate across the entire length from x = −L/2 to +L/2:
  E = [ q y / (4πε₀ L) ] ∫_{−L/2}^{L/2} [ dx / (x² + y²)^{3/2} ]
Using the standard integration identity ∫ dx/(x²+y²)^{3/2} = x / [y² √(x²+y²)]:
  E = [ q y / (4πε₀ L) ] [ x / (y² √(x² + y²)) ]_{−L/2}^{L/2}
  E = [ q / (4πε₀ L y) ] [ (L/2)/√(L²/4 + y²) − (−L/2)/√(L²/4 + y²) ]
  E = [ q / (4πε₀ L y) ] [ L / √(L²/4 + y²) ]
Multiply the numerator and denominator inside the square root by 4 to clear the fraction:
  E = q / [ 2πε₀ y √(L² + 4y²) ]  ◀ Proved.`},

  {id:20,tag:"GAUS",years:["2020"],marks:"6",
   q:"A spherically symmetric charge distribution of radius a is characterized by charge density ρ(r) = ρ₀(1 - r²/a²) for r ≤ a, and 0 for r > a. Calculate (i) total charge, (ii) E field outside and inside, (iii) radius where field is maximum.",
   sol:`━━━ (i) Total Charge Q ━━━
Integrate the charge density over spherical shells from r = 0 to a:
  Q = ∫₀^a ρ(r) 4πr² dr = 4π ρ₀ ∫₀^a (r² − r⁴/a²) dr = 4π ρ₀ [ r³/3 − r⁵/(5a²) ]₀^a
  Q = 4π ρ₀ [ a³/3 − a³/5 ] = 4π ρ₀ a³ (2/15) = 8π ρ₀ a³ / 15  ◀

━━━ (ii) Electric Field E ━━━
• Outside Region (r > a): By Gauss's Law, choose a concentric spherical surface of radius r:
  E(4πr²) = Q / ε₀  ⇒  E = Q / (4πε₀ r²) = 2ρ₀a³ / (15ε₀ r²)  ◀
• Inside Region (r ≤ a): Find the charge enclosed within radius r:
  q_enc = 4π ρ₀ ∫₀^r (r'^2 − r'^4/a²) dr' = 4π ρ₀ [ r³/3 − r⁵/(5a²) ]
Apply Gauss's Law inside:
  E(4πr²) = q_enc / ε₀ = [ 4π ρ₀ / ε₀ ] [ r³/3 − r⁵/(5a²) ]
  E = [ ρ₀ / ε₀ ] [ r/3 − r³/(5a²) ]  ◀

━━━ (iii) Radius for Maximum E-field ━━━
To find where E is maximized inside the distribution, take the derivative dE/dr and set it to zero:
  dE/dr = [ ρ₀ / ε₀ ] [ 1/3 − 3r²/(5a²) ] = 0
  1/3 = 3r² / (5a²)  ⇒  9r² = 5a²  ⇒  r² = 5a²/9
  ∴ r = a √(5) / 3 ≈ 0.745 a  ◀`},

  {id:21,tag:"CAP",years:["2018","2019","2021","2022","2023","2024"],marks:"6",
   q:"Define capacitance. Derive an expression for the capacitance of a coaxial cylindrical capacitor of length L and radii a and b (b > a) where L ≫ b.",
   sol:`━━━ 1. Capacitance Definition ━━━
Capacitance (C) is defined as the ratio of the magnitude of charge (Q) on either conductor to the potential difference (V) between them: C = Q/V.

━━━ 2. Cylindrical Capacitor Derivation ━━━
Let the inner solid cylinder of radius a carry a uniform charge +Q, and the outer cylindrical shell of radius b carry charge −Q. The linear charge density is λ = Q/L.
Choose a cylindrical Gaussian surface of radius r (where a < r < b) and length L. Applying Gauss's Law:
  ∮ E·dA = E (2πrL) = Q_enc / ε₀ = Q / ε₀
  E = Q / (2πε₀ L r)
Find the potential difference V by integrating this electric field from the inner cylinder to the outer shell:
  V = − ∫_b^a E dr = ∫_a^b [ Q / (2πε₀ L r) ] dr = [ Q / (2πε₀ L) ] [ ln(r) ]_a^b
  V = [ Q / (2πε₀ L) ] ln(b/a)
Substitute this potential expression back into the core definition of capacitance C = Q/V:
  C = Q / [ (Q / (2πε₀ L)) ln(b/a) ]
  C = 2πε₀ L / ln(b/a)  ◀`},

  {id:22,tag:"CAP",years:["2024"],marks:"4",
   q:"A variable air-gap tuning capacitor consists of n = 10 plates of alternating polarity, each having area A = 2.5 cm² and separated from adjacent plates by distance d = 2.40 mm. Find its maximum capacitance.",
   sol:`In an interlocking multi-plate capacitor system with n alternating plates, the plates stack such that each intermediate plate faces two opposing surfaces, forming a network of parallel capacitors. The total number of parallel capacitive elements created is:
  N = n − 1
Given n = 10 plates, the system forms N = 9 parallel capacitors.
Convert the given values to standard SI units:
  Area A = 2.5 cm² = 2.5 × 10^{−4} m²
  Separation d = 2.40 mm = 2.40 × 10^{−3} m
  Permittivity of free space ε₀ = 8.854 × 10^{−12} F/m

The formula for the total maximum parallel capacitance is:
  C_max = N · [ ε₀ A / d ]
  C_max = 9 · [ (8.854 × 10^{−12} × 2.5 × 10^{−4}) / (2.40 × 10^{−3}) ]
  C_max = 9 · [ 2.2135 × 10^{−15} / (2.40 × 10^{−3}) ]
  C_max = 9 · [ 9.2229 × 10^{−13} ] = 8.30 × 10^{−12} Farads = 8.30 pF  ◀`},

  {id:23,tag:"CAP",years:["2023","2022"],marks:"6",
   q:"A parallel plate capacitor has plate area A = 10.5 cm² and separation 2d = 7.12 mm. The left half is filled with dielectric κ₁ = 21.0. The top right half has κ₂ = 42.0, bottom right half has κ₃ = 58.0. Find the total capacitance.",
   sol:`Let's analyze the geometry based on the asymmetric split:
1. Left Half Capacitor (C₁): Occupies half the total plate area (A/2) and spans the full separation thickness (2d).
  C₁ = κ₁ ε₀ (A/2) / (2d) = κ₁ ε₀ A / (4d)
2. Right Half Capacitor Network: The right side is split horizontally into two stacked layers. Each layer has a plate area of A/2 and a thickness of d.
  • Top Right Layer (C₂): C₂ = κ₂ ε₀ (A/2) / d = κ₂ ε₀ A / (2d)
  • Bottom Right Layer (C₃): C₃ = κ₃ ε₀ (A/2) / d = κ₃ ε₀ A / (2d)
Since these two right layers are stacked on top of each other, they are connected in series. Their equivalent capacitance C_right is:
  1/C_right = 1/C₂ + 1/C₃ = [ 2d / (ε₀ A) ] [ 1/κ₂ + 1/κ₃ ] = [ 2d / (ε₀ A) ] [ (κ₂ + κ₃) / (κ₂ κ₃) ]
  C_right = [ ε₀ A / (2d) ] · [ κ₂ κ₃ / (κ₂ + κ₃) ]
The left half (C₁) and the combined right half (C_right) sit side-by-side, sharing the same potential difference, meaning they are connected in parallel:
  C_total = C₁ + C_right = [ ε₀ A / (4d) ] · κ₁ + [ ε₀ A / (2d) ] · [ κ₂ κ₃ / (κ₂ + κ₃) ]
  C_total = [ ε₀ A / (4d) ] [ κ₁ + 2 κ₂ κ₃ / (κ₂ + κ₃) ]

Given values: A = 10.5 × 10^{−4} m², 2d = 7.12 × 10^{−3} m → d = 3.56 × 10^{−3} m.
  Base factor [ε₀ A / (4d)] = (8.854 × 10^{−12} × 10.5 × 10^{−4}) / (4 × 3.56 × 10^{−3}) = 6.5286 × 10^{−13} F
  Dielectric factor bracket = 21.0 + [ 2(42.0 × 58.0) / (42.0 + 58.0) ] = 21.0 + [ 4872 / 100 ] = 69.72
  C_total = 6.5286 × 10^{−13} F × 69.72 = 4.552 × 10^{−11} Farads = 45.52 pF  ◀`},

  {id:24,tag:"CAP",years:["2021"],marks:"5",
   q:"A parallel-plate capacitor (area A, spacing d) is charged to ±Q₀ and isolated. A dielectric slab of thickness t ≤ d and constant κ is inserted between the plates. Find the final field, potential difference, and capacitance.",
   sol:`Because the charged capacitor is isolated from any external power source or battery, the charge stored on its plates remains constant: Q_final = Q₀.

• 1. Electric Field Breakdown:
  Before insertion, the baseline electric field in the air gap is E₀ = Q₀ / ( shreds A ).
  Inside the inserted dielectric slab of thickness t, the electric field is reduced by polarization: E_d = E₀ / κ = Q₀ / (κ ε₀ A).
  In the remaining un-filled air gap of thickness (d − t), the field stays E₀.

• 2. Potential Difference V:
  Integrate the electric field across the total plate separation distance:
  V = E₀ (d − t) + E_d (t) = E₀ (d − t) + [ E₀ / κ ] t = E₀ [ d − t + t/κ ]
  V = [ Q₀ / (ε₀ A) ] [ d − t (1 − 1/κ) ]  ◀

• 3. Final Capacitance C:
  Using the relationship C = Q₀ / V:
  C = Q₀ / [ (Q₀ / (ε₀ A)) (d − t (1 − 1/κ)) ]
  C = ε₀ A / [ d − t (1 − 1/κ) ]  ◀`},

  {id:25,tag:"CAP",years:["2019","2020","2021","2022","2023"],marks:"6",
   q:"Derive energy stored in a capacitor U = ½CV². Hence derive the electric energy density u_E = ½ε₀E².",
   sol:`━━━ 1. Stored Energy Derivation ━━━
Consider a capacitor initially carrying zero charge. In the process of charging, transferring a small increment of charge dq from one plate to another requires work against the instantaneous potential difference v = q/C:
  dW = v dq = [ q / C ] dq
Integrate this expression from the uncharged state q = 0 to the final total charge q = Q:
  U = ∫₀^Q [ q / C ] dq = [ 1 / C ] [ q²/2 ]₀^Q = Q² / (2C)
Using the identity Q = CV, we can rewrite the stored electrostatic potential energy as:
  U = ½ C V²  ◀

━━━ 2. Energy Density Derivation ━━━
For an ideal parallel-plate capacitor, the capacitance is C = ε₀A/d and the potential difference is related to the uniform field by V = Ed. Substitute these expressions into the energy formula:
  U = ½ [ ε₀ A / d ] (E d)² = ½ ε₀ E² (A d)
The term (A d) represents the physical volume enclosed between the plates. The energy density u_E is defined as the stored energy per unit volume:
  u_E = U / Volume = [ ½ ε₀ E² (A d) ] / (A d)
  u_E = ½ ε₀ E²  ◀`},

  {id:26,tag:"CAP",years:["2021","2023","2024"],marks:"4",
   q:"Derive Gauss's law for dielectric media. Define displacement vector D and show ∇·D = ρ_free.",
   sol:`Inside a dielectric material, an applied electric field creates microscopic polarization, generating bound surface and volume charges. The standard formulation of Gauss's Law must account for both free and bound charges enclosed:
  ε₀ ∮ E·dA = q_free + q_bound
The enclosed bound charge can be expressed as the negative surface integral of the polarization vector P over the boundary surface:
  q_bound = − ∮ P·dA
Substitute this bound charge expression back into the initial Gauss formulation:
  ε₀ ∮ E·dA = q_free − ∮ P·dA
Group the surface integrals together onto the left-hand side:
  ∮ (ε₀ E + P) · dA = q_free
To simplify this equation for dielectric media, we define the Electric Displacement Vector D as:
  D = ε₀ E + P
Substituting D back into the surface integral yields Gauss's Law for dielectrics:
  ∮ D·dA = q_free  ◀
Applying the Divergence Theorem to convert the left side into a volume integral and expressing free charge as ∫ ρ_free dV gives the differential form:
  ∇·D = ρ_free  ◀`},

  {id:27,tag:"RC",years:["2018","2019","2020","2021","2022","2023","2024"],marks:"6",
   q:"A capacitor C connected in series with R and battery ε. Derive expressions for charge q(t) and current i(t) during charging. Define time constant τ.",
   sol:`━━━ 1. Circuit Derivation ━━━
Apply Kirchhoff's Voltage Law (KVL) around the loop containing the battery EMF ε, resistor R, and capacitor C:
  ε − iR − q/C = 0
Since current is defined as the rate of charge flow, substitute i = dq/dt into the equation:
  ε − R (dq/dt) − q/C = 0  ⇒  R (dq/dt) + q/C = ε
This is a first-order linear differential equation. Divide through by resistance R:
  dq/dt + q / (RC) = ε / R
The general solution is the sum of the complementary solution (q_h = A e^{−t/RC}) and the particular solution (q_p = Cε):
  q(t) = Cε + A e^{−t/RC}
Apply the initial condition for an uncharged capacitor, q(0) = 0:
  0 = Cε + A  ⇒  A = −Cε
Substitute A back into the general solution to find the charge as a function of time:
  q(t) = Cε [ 1 − e^{−t/RC} ]  ◀
Find the instantaneous current i(t) by taking the time derivative of the charge function:
  i(t) = dq/dt = Cε [ 0 − (−1/RC) e^{−t/RC} ] = (ε / R) e^{−t/RC}  ◀

━━━ 2. Time Constant τ ━━━
The product RC is defined as the inductive time constant of the circuit: τ = RC.
At a time of t = τ, the term simplifies to:
  q(τ) = Cε [ 1 − e^{−1} ] = Cε [ 1 − 0.368 ] = 0.632 Cε
Thus, the time constant τ represents the time required for the charging capacitor to reach 63.2% of its maximum equilibrium charge.`},

  {id:28,tag:"RC",years:["2024"],marks:"4",
   q:"A 15.0 kΩ resistor and a capacitor are connected in series, and a 12.0 V potential difference is applied. The potential across the capacitor rises to 7.00 V in 1.50 ms. Calculate (i) time constant, (ii) capacitance.",
   sol:`The transient voltage response across a charging capacitor is given by:
  V_c(t) = V₀ [ 1 − e^{−t/τ} ]
Given values: V_c = 7.00 V, V₀ = 12.0 V, t = 1.50 ms = 1.50 × 10^{−3} s, R = 15.0 × 10³ Ω.

━━━ (i) Calculate Time Constant τ ━━━
Substitute the given values into the voltage charging equation:
  7.00 = 12.0 [ 1 − e^{−t/τ} ]
  7 / 12 = 1 − e^{−t/τ}  ⇒  e^{−t/τ} = 1 − 7/12 = 5/12
Take the natural logarithm of both sides to isolate the exponential term:
  −t/τ = ln(5/12) = −0.87547
  Encoding for τ: τ = t / 0.87547 = (1.50 × 10^{−3} s) / 0.87547
  τ = 1.713 × 10^{−3} seconds = 1.713 ms  ◀

━━━ (ii) Calculate Capacitance C ━━━
Since the circuit time constant is defined as τ = RC, solve for C:
  C = τ / R = (1.7133 × 10^{−3} s) / (15.0 × 10³ Ω)
  C = 1.142 × 10^{−7} Farads = 0.114 μF  ◀`},

  {id:29,tag:"RC",years:["2024"],marks:"6",
   q:"Electric fish generate current using cells called electroplaques. In an eel, they are arranged in 150 rows, each containing 6000 cells in series. Each cell has emf=0.17V, internal resistance r=0.27Ω. If water resistance R=800Ω, find total current in water, current per row, and explain why the eel doesn't shock itself.",
   sol:`━━━ Circuit Parameter Grouping ━━━
Each row contains N = 6000 cells in series:
  • Combined EMF of one row: E_row = N · e = 6000 × 0.17 V = 1020 V
  • Combined internal resistance of one row: r_row = N · r = 6000 × 0.27 Ω = 1620 Ω

The full biological battery system consists of M = 150 identical parallel rows:
  • The total equivalent internal resistance of all parallel rows is: r_eq = r_row / M = 1620 Ω / 150 = 10.8 Ω
  • Since the rows are connected in parallel, the total equivalent EMF remains equal to that of a single row: E_eq = 1020 V

━━━ Solutions ━━━
(i) Total current produced in the surrounding water path (R = 800 Ω):
  I_total = E_eq / (r_eq + R) = 1020 V / (10.8 Ω + 800 Ω) = 1020 / 810.8 = 1.258 Amperes  ◀
(ii) Current traveling through each individual parallel row:
  I_row = I_total / M = 1.258 A / 150 = 0.00839 A = 8.39 mA  ◀
(iii) Why the eel doesn't stun itself: The high current of 1.26 A flows mainly through the surrounding water, which offers a lower resistance path compared to the eel's higher internal body resistance. Additionally, the current flowing within the fish's body is safely divided among 150 parallel pathways, keeping the current inside any single row at a safe level of only ~8.4 mA. The fish's vital organs are also insulated by specialized high-resistance connective tissue layers.`},

  {id:30,tag:"RC",years:["2023"],marks:"5",
   q:"Two long concentric cylinders (radii a and b) are separated by a material of conductivity σ. If maintained at potential difference V, what radial current flows over a length L?",
   sol:`Let a total radial current I flow outward from the inner cylinder of radius a to the outer cylinder of radius b. At any intermediate radial distance r (where a < r < b), the current passes through a cylindrical cross-sectional area of A = 2πrL.
The magnitude of the current density vector is:
  J = I / A = I / (2π r L)
Using the microscopic vector form of Ohm's Law, J = σE, express the electric field as:
  E = J / σ = I / (2π σ L r)
Find the potential difference V between the two cylinders by integrating this electric field equation from the inner radius to the outer radius:
  V = ∫_a^b E dr = ∫_a^b [ I / (2π σ L r) ] dr = [ I / (2π σ L) ] ∫_a^b (1/r) dr
  V = [ I / (2π σ L) ] [ ln(r) ]_a^b = [ I / (2π σ L) ] ln(b/a)
Now, solve this equation directly for the total current parameter I:
  I = 2π σ L V / ln(b/a)  ◀`},

  {id:31,tag:"RC",years:["2023"],marks:"4",
   q:"Show that, according to the free-electron model of electrical conduction in metals and classical physics, the resistivity of metals should be proportional to √T.",
   sol:`In the classical free-electron model, the electrical resistivity of a metal is formulated as:
  ρ = m / (n e² τ)
where m is the electron mass, n is the free carrier concentration, e is the elementary charge, and τ is the mean free time between successive lattice collisions.
The mean free time can be expressed as τ = λ / v_th, where λ is the mean free path (the average distance between lattice collisions, which is roughly a constant fixed by the crystal structure) and v_th is the average random thermal velocity of the electrons.
According to the classical equipartition theorem in kinetic theory, the thermal kinetic energy of an electron scales linearly with absolute temperature:
  ½ m v_th² = ³/₂ k_B T  ⇒  v_th = √(3 k_B T / m)
This indicates that the thermal velocity scales with the square root of temperature: v_th ∝ √T.
Substitute this velocity relationship back into the expression for mean free time:
  破坏 τ = λ / v_th  ⇒  破坏 τ ∝ 1 / √T
Finally, substitute this time scaling back into the core resistivity equation:
  ρ = m / (n e² τ) ∝ 1 / (1 / √T)  ⇒  ρ ∝ √T  ◀
This proves that classical mechanics predicts metallic resistivity increases with the square root of temperature.`},

  {id:32,tag:"RC",years:["2022"],marks:"4",
   q:"What multiple of the time constant gives the time taken by an initially uncharged capacitor in an RC series circuit to be charged to 99.0% of its final charge?",
   sol:`The time-dependent formula for charge accumulation on a capacitor in a series RC circuit is:
  q(t) = q_max [ 1 − e^{−t/τ} ]
We want to find the specific time t when the accumulated charge reaches 99.0% of its maximum value, meaning q(t) = 0.99 q_max.
Substitute this condition into the charging equation:
  0.99 q_max = q_max [ 1 − e^{−t/τ} ]
Divide through by q_max to simplify the expression:
  0.99 = 1 − e^{−t/τ}
Rearranging terms to isolate the exponential factor gives:
  e^{−t/τ} = 1 − 0.99 = 0.01
Take the natural logarithm of both sides of the equation:
  −t/τ = ln(0.01)
Since ln(0.01) = ln(10^{−2}) = −2 ln(10) ≈ −4.60517, solve for time t:
  −t/τ = −4.60517
  t = 4.61 τ  ◀
Therefore, it takes approximately 4.61 time constants for the capacitor to charge to 99% of its full equilibrium value.`},

  {id:33,tag:"BIOT",years:["2018","2019","2021","2022","2023","2024"],marks:"6",
   q:"State Biot-Savart loop equation. A loop with radius R and current I lies in the x-y plane. Show that the magnetic field on its symmetric axis is B(z) = μ₀IR²/[2(R²+z²)^(3/2)] ẑ. Check cases z ≫ R and z = 0.",
   sol:`━━━ 1. Biot-Savart Law ━━━
The differential magnetic field vector dB produced by a steady current element I dl at a displacement distance r is:
  dB = [ μ₀ / (4π) ] · [ I dl × r̂ / r² ]

━━━ 2. On-Axis Derivation ━━━
Let a circular current loop of radius R lie in the x-y plane, centered at the origin. We want to find the magnetic field at point P on the z-axis at a distance z.
The distance from any point on the loop to point P is r = √(R² + z²). The angle between dl and the displacement vector is 90°, so the magnitude of dB is:
  |dB| = [ μ₀ I dl ] / [ 4π (R² + z²) ]
The field vector dB is perpendicular to the displacement vector r, making an angle α with the z-axis. When integrating around the circular loop, the components perpendicular to the z-axis cancel out due to symmetry. Only the components along the central z-axis add up:
  dB_z = |dB| cosα
From geometry, cosα = R / r = R / √(R² + z²). Substitute this back into the equation:
  dB_z = [ μ₀ I R dl ] / [ 4π (R² + z²)^{3/2} ]
Integrate around the loop path (total length ∮ dl = 2πR):
  B(z) = [ μ₀ I R / (4π (R² + z²)^{3/2}) ] · 2πR
  B(z) = μ₀ I R² / [ 2 (R² + z²)^{3/2} ] ẑ  ◀

━━━ 3. Limiting Cases ━━━
• At the center (z = 0): B(0) = μ₀ I R² / [2(R²)^{3/2}] = μ₀ I / (2R). This matches the standard formula for a loop center field.
• Far Field (z ≫ R): We can neglect R² in the denominator:
  B(z) ≈ μ₀ I R² / (2z³) = μ₀ [ I π R² ] / (2π z³) = μ₀ μ / (2π z³)
This matches the magnetic dipole field scaling, where μ = IπR² is the dipole moment magnitude.`},

  {id:34,tag:"BIOT",years:["2024"],marks:"5",
   q:"What is the Hall effect? In Thompson's apparatus, the electric and magnetic fields are perpendicular. Derive an expression for the ratio e/m of the charged particles moving through this apparatus.",
   sol:`━━━ 1. Hall Effect Definition ━━━
The Hall Effect is the generation of a transverse voltage difference across an electrical conductor when a magnetic field is applied perpendicular to the direction of the current flow.

━━━ 2. Thompson's e/m Ratio Derivation ━━━
In Thompson's apparatus, electrons pass through crossed electric field E and magnetic field B. By tuning the fields so that the net force is zero, the particles travel in a straight line without deflection:
  F_net = qE − qvB = 0  ⇒  v = E / B
Next, turn off the electric field E, allowing the magnetic force alone to act as a centripetal force that bends the electron path into a circle of radius r:
  e v B = m v² / r  ⇒  e / m = v / (B r)
Substitute the velocity equation v = E/B into this expression:
  e / m = (E / B) / (B r)
  e / m = E / (B² r)  ◀
By measuring the field strengths E, B, and the path radius r, the charge-to-mass ratio e/m can be calculated.`},

  {id:35,tag:"BIOT",years:["2024"],marks:"3",
   q:"An electric field of 1.50 kV/m and a perpendicular magnetic field of 0.400 T act on a moving electron to produce no net force. What is the electron's speed?",
   sol:`For a moving electron to travel through crossed electric and magnetic fields with no net deflection, the upward electric force and downward magnetic force must balance each other exactly:
  F_net = 0  ⇒  F_E = F_B
The magnitude of the electric force is F_E = eE, and the magnitude of the magnetic force is F_B = evB.
Setting them equal to each other gives:
  e E = e v B
Solve this equation for the electron speed v:
  v = E / B
Substitute the given values into the equation (convert E to standard units: 1.50 kV/m = 1500 V/m):
  v = 1500 V/m / 0.400 T
  v = 3750 m/s = 3.75 × 10³ m/s  ◀`},

  {id:36,tag:"BIOT",years:["2018","2019","2021","2022","2023","2024"],marks:"4",
   q:"Use Ampere's law to show that the magnetic field of a very long solenoid consists of B = μ₀ni inside and zero outside.",
   sol:`━━━ 1. Ampere's Circuital Law ━━━
The line integral of the magnetic field B around any closed loop is equal to μ₀ times the total steady current enclosed by that loop:
  ∮ B·dl = μ₀ I_enc

━━━ 2. Solenoid Derivation ━━━
Consider an ideal, infinitely long solenoid with n turns per unit length carrying current i. We choose a rectangular Amperian loop abcd of length L. Side ab lies inside the solenoid parallel to the axis, side cd lies outside, and sides bc and da cross the walls.
We break the line integral into four segments:
  ∫_a^b B·dl + ∫_b^c B·dl + ∫_c^d B·dl + ∫_d^a B·dl = μ₀ I_enc
• Inside segment ab: The field B is uniform and parallel to the path length L, simplifying the integral to B · L.
• Outside segment cd: For an ideal long solenoid, the external magnetic field is zero (B = 0), so this integral vanishes.
• Vertical segments bc and da: The magnetic field B is perpendicular to the path dl inside the solenoid (B·dl = 0), and the field is zero outside, so these integrals vanish.
Therefore, the total closed loop integral simplifies to:
  ∮ B·dl = B · L
The total current enclosed by the loop is equal to the number of turns over length L multiplied by the current per turn:
  I_enc = n L i
Substitute these terms back into Ampere's law:
  B · L = μ₀ (n L i)
  B = μ₀ n i  ◀ (Inside the core)
  B = 0  ◀ (Outside the core)`},

  {id:37,tag:"FORC",years:["2018","2019","2021","2022","2023","2024"],marks:"4",
   q:"In a nuclear physics experiment, a proton with kinetic energy K_p = 1.0 MeV moves in a circular path inside a uniform magnetic field. What energy must an alpha particle (q=2e, m=4u) and a deuteron (q=e, m=2u) have if they are to circulate in the same circular path?",
   sol:`For a charged particle moving in a circular path inside a magnetic field, the magnetic force provides the centripetal acceleration:
  q v B = m v² / r  ⇒  v = q B r / m
The kinetic energy of the particle can be expressed as:
  K = ½ m v² = ½ m (q B r / m)² = q² B² r² / (2m)
Since the magnetic field B and path radius r are identical for all particles, the term B²r²/2 is constant. This means kinetic energy scales as:
  K ∝ q² / m
Let's calculate the energy ratios relative to the proton (q=e, m=1u):

1. Alpha Particle (q_α = 2e, m_α = 4u):
  K_α / K_p = (q_α / q_p)² · (m_p / m_α) = (2 / 1)² · (1 / 4) = 4 · (1/4) = 1
  Since K_p = 1.0 MeV, the required kinetic energy is K_α = 1.0 MeV  ◀

2. Deuteron Particle (q_d = e, m_d = 2u):
  K_d / K_p = (q_d / q_p)² · (m_p / m_d) = (1 / 1)² · (1 / 2) = 1/2 = 0.5
  Therefore, the required kinetic energy is K_d = 0.5 × 1.0 MeV = 0.5 MeV  ◀`},

  {id:38,tag:"FORC",years:["2022","2023","2024"],marks:"4",
   q:"Show that force due to a magnetic field on a current carrying wire is given by F_B = i L × B.",
   sol:`Consider a straight wire segment of length L and cross-sectional area A carrying current i, placed inside a uniform magnetic field B.
Let n be the number density of free charge carriers per unit volume, each carrying charge e and moving with a drift velocity v_d.
The magnetic force acting on a single moving charge carrier is given by the Lorentz force:
  f = e (v_d × B)
The total number of charge carriers inside the wire segment volume is:
  N = n · Volume = n A L
Therefore, the total net force acting on the entire wire segment is the product of the number of carriers and the force per carrier:
  F = N · f = (n A L) e (v_d × B)
Rearrange the scalar terms in the equation:
  F = (n e v_d A) (L × B)
We know from microscopic current definitions that the term (n e v_d A) is equal to the macroscopic current i flowing through the wire. Substituting this in yields:
  F = i L × B  ◀ Proved.
(The vector direction of length L matches the direction of conventional current flow).`},

  {id:39,tag:"FORC",years:["2020","2022","2023","2024"],marks:"5",
   q:"Derive an expression for the torque on a current loop in a uniform magnetic field.",
   sol:`Consider a rectangular current loop with dimensions a and b carrying current I, placed inside a uniform magnetic field B. Let the normal vector of the loop make an angle θ relative to the magnetic field lines.
The magnetic forces acting on the sides of length b are parallel to the axis of rotation and cancel each other out, producing no torque.
The magnetic forces acting on the sides of length a are perpendicular to the field lines, with a magnitude of:
  F = I a B
These two forces are equal in magnitude and opposite in direction, forming a force couple that causes the loop to rotate.
The perpendicular distance between the lines of action of these two forces is b sinθ. The net torque generated by this couple is:
  τ = Force × perpendicular distance = (I a B) · (b sinθ)
  τ = I (a b) B sinθ
Since the area of the rectangular loop is A = a · b, rewrite the torque magnitude as:
  τ = I A B sinθ
We define the magnetic dipole moment of the loop as μ = I A. Substitute μ into the equation:
  τ = μ B sinθ
In vector cross-product notation, this is generalized as:
  τ = μ × B  ◀`},

  {id:40,tag:"FAR",years:["2018","2019","2021","2022","2024"],marks:"6",
   q:"State Faraday's law and Lenz's law. Derive an expression for the current I(t) in an LR circuit after battery EMF ε is suddenly connected.",
   sol:`━━━ 1. Laws of Induction ━━━
• Faraday's Law: The magnitude of the electromotive force (EMF) induced in a closed loop is directly proportional to the time rate of change of magnetic flux passing through the loop: ε = −dΦ_B/dt.
• Lenz's Law: The direction of the induced current is always such that it creates a magnetic field that opposes the initial change in magnetic flux that produced it.

━━━ 2. LR Circuit Current Growth Derivation ━━━
Apply Kirchhoff's Voltage Law (KVL) to a series circuit containing a battery EMF ε, resistor R, and inductor L:
  ε − L(dI/dt) − I R = 0
Rearrange terms to set up a first-order differential equation:
  L(dI/dt) + I R = ε  ⇒  dI/dt + (R/L) I = ε / L
This is a first-order linear ODE. The general solution is the sum of the particular steady-state solution (I_p = ε/R) and the transient solution (I_h = A e^{−Rt/L}):
  I(t) = ε/R + A e^{−Rt/L}
Apply the initial condition for an uncharged loop, I(0) = 0:
  0 = ε/R + A  ⇒  A = −ε/R
Substitute A back into the general solution to find the current as a function of time:
  I(t) = (ε / R) [ 1 − e^{−Rt/L} ]  ◀
We define the inductive time constant as τ_L = L/R, simplifying the expression to:
  I(t) = I_max [ 1 − e^{−t/τ_L} ]`},

  {id:41,tag:"FAR",years:["2019","2021","2024"],marks:"4",
   q:"Show that the energy stored in the magnetic field of an inductor is U = ½LI². Hence show that the magnetic energy density is u_B = B²/(2μ₀).",
   sol:`━━━ 1. Stored Magnetic Energy ━━━
When a battery establishes a current in an inductor, it must perform work against the induced back-EMF (ε = −L dI/dt). The power required to maintain this current increment is:
  P = dW/dt = |ε| I = L I (dI/dt)
Multiply both sides by dt to find the small increment of work done:
  dW = L I dI
Integrate this expression from an initial current of zero to the final steady-state current value I:
  U = ∫₀^I L I' dI' = ½ L I²  ◀

━━━ 2. Energy Density Derivation ━━━
Consider a section of an ideal long solenoid with total turns N, length l, and cross-sectional area A. Its self-inductance is L = μ₀n²Al. The uniform magnetic field inside is B = μ₀nI, which means the current can be expressed as I = B/(μ₀n).
Substitute these expressions back into the stored energy equation:
  U = ½ [ μ₀ n² A l ] [ B / (μ₀ n) ]² = ½ [ μ₀ n² A l ] [ B² / (μ₀² n²) ]
  U = [ B² / (2μ₀) ] (A l)
The term (A l) represents the internal volume enclosed within the solenoid. The magnetic energy density u_B is defined as the stored energy per unit volume:
  u_B = U / Volume = [ (B² / (2μ₀)) (A l) ] / (A l)
  u_B = B² / (2μ₀)  ◀`},

  {id:42,tag:"IND",years:["2018","2019","2021","2022","2023","2024"],marks:"5",
   q:"Define self-inductance. Derive the self-inductance of a long solenoid consisting of n closely wound turns per unit length on a cylinder of radius R and length l.",
   sol:`━━━ 1. Self-Inductance Definition ━━━
Self-inductance (L) is defined as the ratio of the total magnetic flux linkage through a coil to the current flowing through it: L = N Φ_B / I.

━━━ 2. Solenoid Inductance Derivation ━━━
Consider a long solenoid of length l and cross-sectional radius R, with n turns per unit length. The total number of turns is N = n · l.
When a steady current I flows through the solenoid, it generates a uniform internal magnetic field parallel to its axis:
  B = μ₀ n I
The magnetic flux passing through a single turn of the cross-sectional area A = πR² is:
  Φ_B = B · A = [ μ₀ n I ] A
The total flux linkage across all N turns of the solenoid is:
  N Φ_B = (n l) [ μ₀ n I A ] = μ₀ n² A l I
Divide this total flux linkage by the current I to find the self-inductance L:
  L = N Φ_B / I = [ μ₀ n² A l I ] / I
  L = μ₀ n² A l  ◀
This demonstrates that the self-inductance of a solenoid depends purely on its physical dimensions and scales with the square of the number of turns per unit length.`},

  {id:43,tag:"IND",years:["2018","2019","2021","2022","2023","2024"],marks:"5",
   q:"Derive the differential equation that describes the oscillations of a resistanceless LC circuit and comment on the electrical and magnetic energy oscillations.",
   sol:`━━━ 1. Differential Equation ━━━
Consider an ideal circuit containing an inductor L connected in series with a charged capacitor C. Apply Kirchhoff's Voltage Law (KVL) around the loop:
  v_c + v_l = 0  ⇒  q/C + L(dI/dt) = 0
Since current is defined as the rate of change of charge on the capacitor, substitute I = dq/dt into the equation:
  q/C + L (d²q/dt²) = 0
Divide through by the self-inductance parameter L to get the standard form:
  d²q/dt² + [ 1 / (LC) ] q = 0  ◀
This matches the differential equation for a simple harmonic oscillator (d²q/dt² + ω²q = 0), with an angular resonance frequency of ω = 1/√(LC).

━━━ 2. Energy Oscillation Dynamics ━━━
The general solution for the charge on the capacitor is q(t) = Q_max cos(ωt).
• Electrical Energy in the Capacitor:
  U_E(t) = q² / (2C) = [ Q_max² / (2C) ] cos²(ωt)
• Magnetic Energy in the Inductor (Current I = dq/dt = −ω Q_max sin(ωt)):
  U_B(t) = ½ L I² = ½ L [ −ω Q_max sin(ωt) ]² = ½ L ω² Q_max² sin²(ωt)
Since ω² = 1/(LC), simplify the expression:
  U_B(t) = ½ L [ 1 / (LC) ] Q_max² sin²(ωt) = [ Q_max² / (2C) ] sin²(ωt)
The total energy is the sum of both fields:
  U_total = U_E(t) + U_B(t) = [ Q_max² / (2C) ] [ cos²(ωt) + sin²(ωt) ] = Q_max² / (2C)
This demonstrates that total energy is perfectly conserved, continuously oscillating between the capacitor's electric field and the inductor's magnetic field.`},

  {id:44,tag:"IND",years:["2024"],marks:"4",
   q:"If 50.0 cm of copper wire (diameter = 1.00 mm) is formed into a circular loop and placed perpendicular to a uniform magnetic field that is increasing at the constant rate of 10.0 mT/s, at what rate is thermal energy generated in the loop?",
   sol:`━━━ 1. Calculate Loop Area ━━━
The perimeter of the circular loop is equal to the length of the wire: C = 2πR = 0.50 m.
  Radius R = 0.50 / (2π) = 0.07958 meters
  Area A = π R² = π (0.07958)² = 0.019894 m²

━━━ 2. Calculate Wire Resistance ━━━
The wire has a length L = 0.50 m and a cross-sectional diameter of 1.00 mm (radius r_w = 0.50 mm = 5.0 × 10^{−4} m).
  Cross-sectional area A_w = π r_w² = π (5.0 × 10^{−4})² = 7.854 × 10^{−7} m²
The standard resistivity of copper is ρ = 1.68 × 10^{−8} Ω·m. Find the total resistance:
  Resistance R_loop = ρ L / A_w = (1.68 × 10^{−8} × 0.50) / (7.854 × 10^{−7}) = 0.010695 Ω

━━━ 3. Calculate Induced EMF ━━━
Apply Faraday's Law to find the induced EMF from the changing magnetic field (dB/dt = 10.0 mT/s = 0.010 T/s):
  ε = dΦ_B/dt = A (dB/dt) = 0.019894 m² × 0.010 T/s = 1.9894 × 10^{−4} Volts

━━━ 4. Calculate Thermal Energy Generation Rate ━━━
The rate of thermal energy generation is given by Joule heating power (P = ε² / R_loop):
  P = (1.9894 × 10^{−4} V)² / 0.010695 Ω = 3.9577 × 10^{−8} / 0.010695
  P = 3.70 × 10^{−6} Watts = 3.70 μW  ◀`},

  {id:45,tag:"IND",years:["2023"],marks:"4",
   q:"A coil has an inductance of 53 mH and a resistance of 0.35 Ω. (i) If a 12 V EMF is applied, how much energy is stored after current reaches equilibrium? (ii) After how many time constants will half this equilibrium energy be stored?",
   sol:`━━━ (i) Equilibrium Stored Energy ━━━
At steady-state equilibrium, the current in the coil is limited purely by its internal DC resistance:
  I_eq = ε / R = 12 V / 0.35 Ω = 34.286 Amperes
The maximum magnetic energy stored inside the inductor core at equilibrium is:
  U_max = ½ L I_eq² = ½ (53 × 10^{−3} H) · (34.286 A)²
  U_max = 0.0265 × 1175.53 = 31.15 Joules  ◀

━━━ (ii) Time Horizons for Half Stored Energy ━━━
We want to find the time t when the instantaneous stored energy equals half of its maximum value, U(t) = 0.5 U_max:
  ½ L I(t)² = 0.5 (½ L I_eq²)  ⇒  I(t)² = 0.5 I_eq²
  I(t) = I_eq √0.5 ≈ 0.7071 I_eq
The current growth formula as a function of time constants (x = t/τ) is:
  I(t) = I_eq [ 1 − e^{−t/τ} ]
Substitute the target current condition into this growth equation:
  I_eq √0.5 = I_eq [ 1 − e^{−x} ]  ⇒  √0.5 = 1 − e^{−x}
  e^{−x} = 1 − √0.5 = 1 − 0.70711 = 0.29289
Take the natural logarithm of both sides to solve for x:
  −x = ln(0.29289) = −1.2279
  x = 1.23
Therefore, it takes approximately 1.23 time constants to store half of the equilibrium magnetic energy.`},

  {id:46,tag:"MATL",years:["2018","2019","2020","2021","2022","2023","2024"],marks:"7",
   q:"Distinguish between diamagnetic, paramagnetic, and ferromagnetic materials. Show that B = μ₀(H + M) and μ_r = 1 + χ_m.",
   sol:`━━━ 1. Material Comparison Matrix ━━━
• Diamagnetic (e.g., Copper, Bismuth): Have no permanent atomic magnetic moments. An applied external field induces weak opposing moments according to Lenz's law. Magnetic susceptibility χ_m is small and negative (χ_m ≈ −10^{−5}), and the material is weakly repelled by magnets.
• Paramagnetic (e.g., Aluminum, Oxygen): Contain permanent atomic magnetic moments due to unpaired electrons, but thermal agitation keeps them randomly oriented. An applied field aligns them parallel to the lines of force. Susceptibility χ_m is small and positive (χ_m ≈ 10^{−5} to 10^{−3}) and obeys Curie's Law (χ_m ∝ 1/T).
• Ferromagnetic (e.g., Iron, Nickel): Possess permanent magnetic moments with strong quantum exchange coupling that aligns neighboring spins parallel within regions called domains. They produce massive positive magnetization. Susceptibility χ_m is very large (up to 10⁵) and exhibits nonlinear hysteresis loops.

━━━ 2. Derivation of B = μ₀(H + M) ━━━
The total magnetic induction B inside a material is the vector sum of the magnetic field produced by free currents (μ₀H) and the field produced by the material's atomic magnetization alignment (μ₀M):
  B = μ₀H + μ₀M = μ₀(H + M)  ◀ Proved.
For linear magnetic media, the magnetization vector is proportional to the magnetic field intensity: M = χ_m H. Substitute this relationship back into the equation:
  B = μ₀(H + χ_m H) = μ₀(1 + χ_m) H
We define the absolute permeability as μ = μ₀(1 + χ_m) and relative permeability as μ_r = μ / μ₀. Therefore:
  μ_r = 1 + χ_m  ◀`},

  {id:47,tag:"MATL",years:["2018","2019","2020","2022","2023","2024"],marks:"4+4",
   q:"Explain the magnetization curve for a ferromagnetic specimen and an associated hysteresis loop. What does the area of the loop represent?",
   sol:`━━━ 1. Hysteresis Loop Trace Mechanics ━━━
Starting with a completely unmagnetized ferromagnetic specimen at the origin (B=0, H=0):
• Magnetization Curve: As the external magnetic field intensity H is increased, the magnetic domains align parallel to the field, causing the magnetic induction B to rise rapidly along the initial curve until it reaches magnetic saturation (B_s).
• Hysteresis Loop: When the external field H is reduced back to zero, the material retains some magnetization, known as the Remanence (B_r). To reduce the induction field B back down to zero, a reverse magnetic field intensity must be applied, known as the Coercivity (H_c). Continuing to alternate the external field H in the negative and positive directions forms a closed path known as the Hysteresis Loop.

━━━ 2. Physical Meaning of Loop Area ━━━
The total mechanical work done per unit volume by the external field during a complete cycle of magnetization is given by the closed loop line integral:
  W = ∮ H dB
Mathematically, this integral corresponds exactly to the geometric area enclosed by the hysteresis loop. This work is converted into heat due to friction from domain walls switching alignment. Therefore, the loop area represents the energy dissipated as thermal loss per unit volume per cycle  ◀`},

  {id:48,tag:"MATL",years:["2024"],marks:"4",
   q:"The magnetic susceptibility of a medium is 948 × 10^{−11}. Calculate the absolute permeability and relative permeability.",
   sol:`Given the magnetic susceptibility value: χ_m = 948 × 10^{−11} = 9.48 × 10^{−9}.

━━━ 1. Calculate Relative Permeability μ_r ━━━
The relationship between relative permeability and magnetic susceptibility is given by:
  μ_r = 1 + χ_m
Substitute the given value into the equation:
  μ_r = 1 + 948 × 10^{−11}
  μ_r = 1 + 0.00000000948 = 1.00000000948  ◀
(This very small positive fraction indicates the medium is extremely weakly paramagnetic).

━━━ 2. Calculate Absolute Permeability μ ━━━
The absolute permeability is the product of the relative permeability and the permeability of free space constant (μ₀ = 4π × 10^{−7} T·m/A):
  μ = μ_r · μ₀
  μ = (1.00000000948) × (4π × 10^{−7} T·m/A)
  μ = 1.00000000948 × 1.256637061 × 10^{−6}
  μ = 1.256637073 × 10^{−6} T·m/A  ◀`}
];

function Timer({ totalMins, label, color }) {
  const [secs, setSecs] = useState(totalMins * 60);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running && secs > 0) {
      ref.current = setInterval(() => setSecs(s => {
        if (s <= 1) { clearInterval(ref.current); setRunning(false); setDone(true); return 0; }
        return s - 1;
      }), 1000);
    }
    return () => clearInterval(ref.current);
  }, [running]);
  const mm = Math.floor(secs / 60).toString().padStart(2, '0');
  const ss = (secs % 60).toString().padStart(2, '0');
  const pct = Math.round(((totalMins * 60 - secs) / (totalMins * 60)) * 100);
  const reset = () => { clearInterval(ref.current); setRunning(false); setDone(false); setSecs(totalMins * 60); };
  return (
    <div style={{ border: "0.5px solid var(--color-border-tertiary, #e2e8f0)", borderRadius: 8, padding: "10px 14px", marginTop: 8, background: "var(--color-background-primary, #ffffff)" }}>
      <div style={{ fontSize: 12, color: "var(--color-text-secondary, #64748b)", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 500, fontFamily: "var(--font-mono, monospace)", color: done ? "#16a34a" : color, minWidth: 70 }}>{done ? "✓ Done" : `${mm}:${ss}`}</div>
        <div style={{ flex: 1, background: "var(--color-background-secondary, #f8fafc)", borderRadius: 4, height: 6 }}>
          <div style={{ width: `${pct}%`, background: done ? "#16a34a" : color, height: "100%", borderRadius: 4, transition: "width 1s linear" }} />
        </div>
        <button onClick={() => { if (!done) setRunning(r => !r); }} style={{ padding: "4px 12px", borderRadius: 6, border: "0.5px solid var(--color-border-secondary, #cbd5e1)", cursor: done ? "default" : "pointer", fontSize: 12, background: "var(--color-background-secondary, #f8fafc)", color: "var(--color-text-primary, #0f172a)" }}>
          {done ? "Done" : running ? "⏸ Pause" : "▶ Start"}
        </button>
        <button onClick={reset} style={{ padding: "4px 10px", borderRadius: 6, border: "0.5px solid var(--color-border-secondary, #cbd5e1)", cursor: "pointer", fontSize: 12, background: "var(--color-background-secondary, #f8fafc)", color: "var(--color-text-primary, #0f172a)" }}>↺</button>
      </div>
    </div>
  );
}

function SubTimer({ topicName, initialMins, baseColor }) {
  const [seconds, setSeconds] = useState(initialMins * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, seconds]);

  const toggle = () => {
    if (!isCompleted) setIsActive(!isActive);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setIsCompleted(false);
    setSeconds(initialMins * 60);
  };

  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "var(--color-background-secondary, #f8fafc)", borderRadius: 6, border: "0.5px solid var(--color-border-tertiary, #e2e8f0)", margin: "4px 0", fontSize: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: "70%" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: isCompleted ? "#16a34a" : isActive ? "#eab308" : baseColor }} />
        <span style={{ color: "var(--color-text-primary, #0f172a)", textDecoration: isCompleted ? "line-through" : "none", opacity: isCompleted ? 0.5 : 1 }}>{topicName}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-mono, monospace)", fontWeight: 600, color: isCompleted ? "#16a34a" : "var(--color-text-primary, #0f172a)" }}>{isCompleted ? "Completed" : `${m}:${s}`}</span>
        <button onClick={toggle} disabled={isCompleted} style={{ padding: "2px 8px", fontSize: 11, borderRadius: 4, border: "0.5px solid var(--color-border-secondary, #cbd5e1)", background: isActive ? "#f59e0b" : "#e2e8f0", color: isActive ? "white" : "black", cursor: isCompleted ? "not-allowed" : "pointer" }}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={reset} style={{ padding: "2px 6px", fontSize: 11, borderRadius: 4, border: "0.5px solid var(--color-border-secondary, #cbd5e1)", background: "#e2e8f0", cursor: "pointer" }}>↺</button>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState(0);
  const [tagFilter, setTagFilter] = useState("All");
  const [openQ, setOpenQ] = useState(null);
  const [openDay, setOpenDay] = useState(null);
  const tabs = ["Home", "Pattern", "5-Day Plan", "Questions & Solutions"];
  const tabIcons = ["🏠", "📊", "📅", "📝"];
  const filteredQs = tagFilter === "All" ? QS : QS.filter(q => q.tag === tagFilter);

  const card = {
    background: "var(--color-background-primary, #ffffff)",
    borderRadius: 12,
    padding: "18px 20px",
    marginBottom: 14,
    border: "0.5px solid var(--color-border-tertiary, #e2e8f0)"
  };

  const sloganStyle = {
    marginTop: 20,
    padding: "12px 16px",
    background: "#fff1f2",
    borderLeft: "4px solid #f43f5e",
    borderRadius: "0 8px 8px 0",
    fontSize: 12,
    color: "#9f1239",
    lineHeight: 1.5,
    fontStyle: "italic",
    fontWeight: "500"
  };

  return (
    <div style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)", maxWidth: 800, margin: "0 auto", padding: "16px 14px" }}>
      <h2 className="sr-only">Electricity and Magnetism PH-103 Exam Preparation Guide</h2>

      {/* Header */}
      <div style={{ background: "#042C53", borderRadius: 14, padding: "22px 24px", marginBottom: 18, color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 1.5, opacity: 0.6, marginBottom: 4, textTransform: "uppercase" }}>PH-103 · University of Dhaka</div>
            <div style={{ fontSize: 21, fontWeight: 500, marginBottom: 3 }}>Electricity & Magnetism</div>
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 14 }}>2018–2024 Past Paper Analysis + Full Solutions</div>
            <div style={{ display: "flex", gap: 16, fontSize: 13, flexWrap: "wrap" }}>
              {[["⏱", "3 hours"], ["📋", "8 questions"], ["✏️", "Answer any 5"], ["💯", "70 marks"]].map(([i, t]) => (
                <span key={t} style={{ display: "flex", gap: 5, alignItems: "center", opacity: 0.85 }}>
                  <span>{i}</span><span>{t}</span>
                </span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "right", opacity: 0.65, fontSize: 11 }}>
            <div style={{ marginBottom: 2 }}>created by</div>
            <div style={{ fontWeight: 500, fontSize: 14, color: "#B5D4F4" }}>A.I. Mahi</div>
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "8px 16px", borderRadius: 20,
            border: tab === i ? "none" : "0.5px solid var(--color-border-secondary, #cbd5e1)",
            cursor: "pointer", fontSize: 13,
            background: tab === i ? "#042C53" : "var(--color-background-secondary, #f8fafc)",
            color: tab === i ? "white" : "var(--color-text-primary, #0f172a)",
            fontWeight: tab === i ? 500 : 400
          }}>{tabIcons[i]} {t}</button>
        ))}
      </div>

      {/* ── HOME ── */}
      {tab === 0 && (
        <div>
          {/* 5-Day Overview */}
          <div style={{ ...card, background: "linear-gradient(135deg,#042C53,#185FA5)", border: "none", color: "white" }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 12, opacity: 0.9 }}>তোমার ৫ দিনের টার্গেট</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
              {DAYS_DATA.map(d => (
                <div key={d.day}
                  style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: 12, cursor: "pointer", border: "0.5px solid rgba(255,255,255,0.15)" }}
                  onClick={() => setTab(2)}>
                  <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 2 }}>Day {d.day} · {d.hours}h</div>
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, marginBottom: 7 }}>{d.title}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {d.tags.map(g => <span key={g} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 4, padding: "1px 7px", fontSize: 10 }}>{g}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Format */}
          <div style={card}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14, color: "var(--color-text-primary, #0f172a)" }}>Exam Format</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {[
                ["প্রশ্ন কাঠামো", "৮টি প্রশ্ন, যেকোনো ৫টি উত্তর দিতে হবে"],
                ["প্রতি প্রশ্নের মান", "১৪ নম্বর (সাধারণত ২–৩টি অংশ)"],
                ["Derivation", "প্রতিটিতে ৫–৮ নম্বরের বড় derivation"],
                ["Numerical", "প্রতি প্রশ্নে ১–২টি সংখ্যাতাত্ত্বিক অংশ"],
                ["Diagram", "Circuit, field line ও loop diagram প্রায়ই চাওয়া হয়"],
                ["Repeat trend", "একই derivation ৫–৭ বছর ধরে বারবার আসে"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "var(--color-background-secondary, #f8fafc)", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontWeight: 500, fontSize: 11, color: "var(--color-text-secondary, #64748b)", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>{k}</div>
                  <div style={{ fontSize: 13, color: "var(--color-text-primary, #0f172a)", lineHeight: 1.5 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 */}
          <div style={{ ...card, background: "#E6F1FB", border: "0.5px solid #85B7EB" }}>
            <div style={{ fontWeight: 500, color: "#042C53", marginBottom: 12, fontSize: 15 }}>Top 5 — সবচেয়ে বেশি আসা derivation (এগুলো আগে শেখো)</div>
            {[
              ["RC circuit charging: q(t) = Cε(1−e^(−t/RC))", "২০১৮, ২০১৯, ২০২০, ২০২১, ২০২২, ২০২৩, ২০২৪", 7],
              ["Dipole potential: V = p cosθ/(4πε₀r²)", "২০১৮, ২০১৯, ২০২০, ২০২১, ২০২২, ২০২৩, ۲۰২৪", 7],
              ["B on loop axis: μ₀IR²/[2(R²+z²)^(3/2)]", "২০১৮, ২০১৯, ২০২১, ২০২২, ২০২৩, ২০২৪", 6],
              ["Solenoid: B = μ₀nI + L = μ₀n²Al", "২০১৮, ২০১৯, ২০২১, ২০২২, ২০২৩, ২০২৪", 6],
              ["LC oscillation: d²q/dt² + q/LC = 0, ω = 1/√(LC)", "২০১৮, ২০১৯, ২০২১, ২০২২, ২০২৩, ২০২৪", 6],
            ].map(([d, y, n]) => (
              <div key={d} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: "0.5px solid #B5D4F4", alignItems: "flex-start" }}>
                <span style={{ background: "#042C53", color: "white", borderRadius: 12, padding: "2px 8px", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap", marginTop: 1 }}>{n}/7</span>
                <div>
                  <div style={{ fontSize: 13, color: "#042C53", fontFamily: "var(--font-mono, monospace)" }}>{d}</div>
                  <div style={{ fontSize: 11, color: "#185FA5", marginTop: 2 }}>{y}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick formula card */}
          <div style={{ ...card, background: "#FAEEDA", border: "0.5px solid #EF9F27" }}>
            <div style={{ fontWeight: 500, color: "#412402", marginBottom: 12, fontSize: 15 }}>পরীক্ষায় যা অবশ্যই মুখস্থ রাখতে হবে</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
              {[
                ["Coulomb's Law", "F = kq₁q₂/r²"],
                ["Gauss's Law", "∮E·dA = Q_enc/ε₀"],
                ["Dipole Potential", "V = p cosθ/(4πε₀r²)"],
                ["Cylindrical Cap.", "C = 2πε₀L/ln(b/a)"],
                ["RC Charging", "q = Cε(1−e^(−t/RC))"],
                ["Biot-Savart", "dB = μ₀I dl×r̂/(4πr²)"],
                ["Solenoid", "B = μ₀nI"],
                ["Loop axis", "B = μ₀IR²/[2(R²+z²)^(3/2)]"],
                ["Faraday's Law", "ε = −dΦ_B/dt"],
                ["LR Circuit", "I = (ε/R)(1−e^(−Rt/L))"],
                ["Inductance", "L = μ₀n²Al"],
                ["LC Frequency", "ω = 1/√(LC)"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "#633806", fontWeight: 500, marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 12, color: "#412402", fontFamily: "var(--font-mono, monospace)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={sloganStyle}>
            "If Pulak Sir, the GOAT, wishes, you'll get 70/70. If he wants you to fail, no one except God can help you. So, solve the four in-course questions separately, as they are not included in this document."
          </div>
        </div>
      )}

      {/* ── PATTERN ── */}
      {tab === 1 && (
        <div>
          <div style={card}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 16, color: "var(--color-text-primary, #0f172a)" }}>Topic Frequency (2018–2024)</div>
            {TOPICS.map(t => (
              <div key={t.tag} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "var(--color-text-primary, #0f172a)", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ background: t.bg, color: t.color, borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{t.tag}</span>
                    {t.name}
                  </span>
                  <span style={{ color: t.color, fontWeight: 500, fontSize: 13, whiteSpace: "nowrap", marginLeft: 8 }}>{t.freq}/7</span>
                </div>
                <div style={{ background: "var(--color-background-secondary, #f8fafc)", borderRadius: 6, height: 8 }}>
                  <div style={{ background: t.color, width: `${(t.freq / 7) * 100}%`, height: "100%", borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={card}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14, color: "var(--color-text-primary, #0f172a)" }}>Year-wise Coverage (2018–2024)</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 11, borderCollapse: "collapse", minWidth: 500 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--color-text-secondary, #64748b)", fontWeight: 500, borderBottom: "0.5px solid var(--color-border-secondary, #cbd5e1)" }}>Topic</th>
                    {["2018", "2019", "2020", "2021", "2022", "2023", "2024"].map(y => (
                      <th key={y} style={{ padding: "6px 8px", color: "var(--color-text-secondary, #64748b)", fontWeight: 500, borderBottom: "0.5px solid var(--color-border-secondary, #cbd5e1)", textAlign: "center" }}>{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tag: "VEC",  y: [1,1,1,1,1,1,1] },
                    { tag: "GAUS", y: [1,1,1,1,1,1,1] },
                    { tag: "DIP",  y: [1,1,1,1,1,1,1] },
                    { tag: "CAP",  y: [1,1,1,1,1,1,1] },
                    { tag: "RC",   y: [1,1,1,1,1,1,1] },
                    { tag: "HALL", y: [1,1,1,1,1,1,1] },
                    { tag: "BIOT", y: [1,1,1,1,1,1,1] },
                    { tag: "FORC", y: [1,1,1,1,1,1,1] },
                    { tag: "FAR",  y: [1,1,1,1,1,1,1] },
                    { tag: "IND",  y: [1,1,1,1,1,1,1] },
                    { tag: "MATL", y: [1,1,1,1,1,1,1] },
                    { tag: "KIRCH",y: [1,1,1,1,1,1,1] },
                    { tag: "MAXW", y: [1,1,1,1,1,1,1] },
                  ].map(({ tag, y }) => {
                    const t = TOPICS.find(x => x.tag === tag);
                    return (
                      <tr key={tag} style={{ borderBottom: "0.5px solid var(--color-border-tertiary, #e2e8f0)" }}>
                        <td style={{ padding: "5px 8px" }}>
                          <span style={{ background: t.bg, color: t.color, borderRadius: 4, padding: "1px 7px", fontSize: 10, fontWeight: 500 }}>{tag}</span>
                        </td>
                        {y.map((v, i) => (
                          <td key={i} style={{ textAlign: "center", padding: "5px 8px" }}>
                            {v === 1
                              ? <span style={{ color: "#16a34a", fontSize: 14 }}>✓</span>
                              : <span style={{ color: "var(--color-border-secondary, #cbd5e1)", fontSize: 12 }}>–</span>}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ ...card, background: "#EAF3DE", border: "0.5px solid #97C459" }}>
            <div style={{ fontWeight: 500, color: "#173404", marginBottom: 10, fontSize: 15 }}>Priority Analysis</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
              {[
                { label: "High Frequency Core (All Years)", tags: ["DIP", "CAP", "BIOT", "FORC", "IND", "VEC", "GAUS", "RC", "HALL", "FAR", "MATL"], bg: "#FAEEDA", color: "#412402", border: "#EF9F27" },
                { label: "Essential Support Topics", tags: ["KIRCH", "MAXW"], bg: "#EAF3DE", color: "#173404", border: "#97C459" },
              ].map(({ label, tags, bg, color, border }) => (
                <div key={label} style={{ background: bg, borderRadius: 8, padding: "10px 12px", border: `0.5px solid ${border}` }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color, marginBottom: 8 }}>{label}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {tags.map(g => {
                      const t = TOPICS.find(x => x.tag === g);
                      return <span key={g} style={{ background: t.bg, color: t.color, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>{g}</span>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={sloganStyle}>
            "If Pulak Sir, the GOAT, wishes, you'll get 70/70. If he wants you to fail, no one except God can help you. So, solve the four in-course questions separately, as they are not included in this document."
          </div>
        </div>
      )}

      {/* ── 5-DAY PLAN ── */}
      {tab === 2 && (
        <div>
          <div style={{ background: "#FAEEDA", border: "0.5px solid #EF9F27", borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
            <div style={{ fontWeight: 500, color: "#412402", fontSize: 15, marginBottom: 6 }}>৫ দিনের Master Plan — PH-103</div>
            <div style={{ fontSize: 13, color: "#633806", lineHeight: 1.7 }}>
              প্রতিটি session এর পাশে প্রধান টাইমার রয়েছে। পাশাপাশি সাবটপিকগুলোর জন্য পৃথক **Sub-Timer** যুক্ত করা হয়েছে, যা আপনার মাইক্রো-শেডিউলিং নিখুঁত করবে।
            </div>
          </div>

          {DAYS_DATA.map(d => (
            <div key={d.day} style={{ ...card, borderLeft: `3px solid ${d.color}`, paddingLeft: 17 }}>
              <div
                style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: openDay === d.day ? 12 : 0, cursor: "pointer" }}
                onClick={() => setOpenDay(openDay === d.day ? null : d.day)}>
                <div style={{ background: d.color, color: "white", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>Day {d.day}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary, #0f172a)" }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: "var(--color-text-secondary, #64748b)", marginTop: 2 }}>{d.hours} hours · {d.tags.join(", ")}</div>
                </div>
                <span style={{ fontSize: 14, color: "var(--color-text-secondary, #64748b)" }}>{openDay === d.day ? "▲" : "▼"}</span>
              </div>

              {openDay === d.day && (
                <div>
                  <div style={{ background: d.bg, borderRadius: 8, padding: "10px 14px", marginBottom: 12, marginTop: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: d.color }}>💡 Tip: </span>
                    <span style={{ fontSize: 12, color: "var(--color-text-primary, #0f172a)", lineHeight: 1.6 }}>{d.tip}</span>
                  </div>
                  {d.sessions.map((s, i) => (
                    <div key={i} style={{ border: "1px solid #f1f5f9", borderRadius: 8, padding: 12, margin: "12px 0", background: "#fafafa" }}>
                      <Timer totalMins={s.mins} label={`Session ${i + 1}: ${s.name} (${s.hrs}h)`} color={d.color} />
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: "600", color: "#475569", marginBottom: 6, textTransform: "uppercase" }}>Required Subtopics:</div>
                        {s.subtopics && s.subtopics.map((st, idx) => (
                          <SubTimer key={idx} topicName={st.name} initialMins={st.mins} baseColor={d.color} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ background: "#EAF3DE", border: "0.5px solid #639922", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontWeight: 500, color: "#173404", marginBottom: 12, fontSize: 15 }}>5-Day Summary</div>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Day", "Focus", "Must deliver"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 0", color: "#3B6D11", fontWeight: 500, borderBottom: "0.5px solid #639922" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Electrostatics", "Vector identities, Coordinate transformation, Gauss's law derivations, Axial/Equatorial Dipole fields + SHM frequency"],
                  ["2", "Circuits + Cap", "RC transient differential proof, Cylindrical/Spherical cap, free-electron model scaling, Hall voltage matrix"],
                  ["3", "Magnetostatics", "Biot-Savart loop axis integral, Solenoid loop proof, wire currents, Thompson selector ratio"],
                  ["4", "Induction", "Faraday motional loop fields, LR current expansion, LC harmonic ODE + energy conservation proof"],
                  ["5", "Materials + Revision", "Hysteresis area heat proof, constitutive equations, decoupled Maxwell wave proof, mocks"],
                ].map(([d, f, k]) => (
                  <tr key={d} style={{ borderBottom: "0.5px solid rgba(59,109,17,0.2)" }}>
                    <td style={{ padding: "8px 0", color: "#173404", fontWeight: 500 }}>Day {d}</td>
                    <td style={{ padding: "8px 0", color: "#27500A" }}>{f}</td>
                    <td style={{ padding: "8px 0", color: "#3B6D11", fontSize: 12 }}>{k}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={sloganStyle}>
            "If Pulak Sir, the GOAT, wishes, you'll get 70/70. If he wants you to fail, no one except God can help you. So, solve the four in-course questions separately, as they are not included in this document."
          </div>
        </div>
      )}

      {/* ── QUESTIONS + SOLUTIONS ── */}
      {tab === 3 && (
        <div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: "var(--color-text-secondary, #64748b)", marginBottom: 8 }}>Topic দিয়ে filter করো:</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <button
                onClick={() => setTagFilter("All")}
                style={{ padding: "4px 12px", borderRadius: 14, border: "0.5px solid var(--color-border-secondary, #cbd5e1)", cursor: "pointer", fontSize: 12, background: tagFilter === "All" ? "#042C53" : "var(--color-background-secondary, #f8fafc)", color: tagFilter === "All" ? "white" : "var(--color-text-primary, #0f172a)", fontWeight: tagFilter === "All" ? 500 : 400 }}>
                All ({QS.length})
              </button>
              {TOPICS.map(t => (
                <button key={t.tag} onClick={() => setTagFilter(t.tag)} style={{
                  padding: "4px 10px", borderRadius: 14, border: `0.5px solid ${t.color}`, cursor: "pointer", fontSize: 11,
                  background: tagFilter === t.tag ? t.color : t.bg,
                  color: tagFilter === t.tag ? "white" : t.color, fontWeight: 500
                }}>{t.tag} ({QS.filter(q => q.tag === t.tag).length})</button>
              ))}
            </div>
          </div>

          {filteredQs.map(q => {
            const t = TOPICS.find(x => x.tag === q.tag);
            const isOpen = openQ === q.id;
            return (
              <div key={q.id} style={{ ...card, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => setOpenQ(isOpen ? null : q.id)}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ background: t.bg, color: t.color, borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap", marginTop: 2, flexShrink: 0 }}>{q.tag}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: "var(--color-text-primary, #0f172a)", lineHeight: 1.65 }}>{q.q}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap", alignItems: "center" }}>
                        {q.years.map(y => (
                          <span key={y} style={{ background: "var(--color-background-secondary, #f8fafc)", color: "var(--color-text-secondary, #64748b)", borderRadius: 4, padding: "1px 7px", fontSize: 11 }}>{y}</span>
                        ))}
                        <span style={{ background: "#FAEEDA", color: "#633806", borderRadius: 4, padding: "1px 7px", fontSize: 11 }}>🎯 {q.marks} marks</span>
                        <span style={{ fontSize: 11, color: "var(--color-text-secondary, #64748b)" }}>{q.years.length}× appeared</span>
                      </div>
                    </div>
                    <span style={{ fontSize: 14, color: "var(--color-text-secondary, #64748b)", marginTop: 2, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                </div>
                {isOpen && q.sol && (
                  <div style={{ borderTop: "0.5px solid var(--color-border-tertiary, #e2e8f0)", padding: "14px 16px", background: "var(--color-background-secondary, #f8fafc)" }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: t.color, marginBottom: 10 }}>✅ Exam-ready solution:</div>
                    <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, color: "var(--color-text-primary, #0f172a)", margin: 0, fontFamily: "var(--font-mono, monospace)", lineHeight: 1.9, background: "transparent" }}>{q.sol.trim()}</pre>
                  </div>
                )}
              </div>
            );
          })}
          <div style={sloganStyle}>
            "If Pulak Sir, the GOAT, wishes, you'll get 70/70. If he wants you to fail, no one except God can help you. So, solve the four in-course questions separately, as they are not included in this document."
          </div>
        </div>
      )}
    </div>
  );
}
