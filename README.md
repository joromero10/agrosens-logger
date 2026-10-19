# agrosens-logger

A static web system that records telemetry readings.

Section 4.1: user story
Starting state: The user will see a login page that will display empty slots for the 4 inputs: pH,
electrical conductivity, air temperature, relative humidity. On the other side, there will be an
empty section that will appear as the inputs.
Action 1: When the user is inputting the numbers, js will check for every number and if those
numbers appear in a certain range, it will categorize them as critical, optimal, or warning.
Action 2: When the user clicks submit, the input data will show up in a query. These will be color
coded to show the differences in the their status
Action 3: The UI will change in terms of new information being added into the query section, it
will show all types 1
Action 4: Users are able to add more inputs, they are able to remove them as needed, or add as
many as they like.
Terminal State: the UI will be able to return to its original state, waiting for more inputs similar
to the starting state.
Section 4.2: ux constraints and anaysis
Norman Principle /
Concept
Gulf of Execution  
System Context  
Typing numeric sensor metrics (pH,
ElectricalConductivity[EC], Temp,
Humidity)
Context Questions to Answer Using
Concrete Implementation Mechanism
(DOM / HTML / JS)
How do field labels, units of measure,
and placeholder attributes clarify
expected formats to the user?
ANS: The labels will be cleared
hand have their labels and
placeholders to let users know
what to put into the fields. “pH
(0-14)”, “EC (cm)”, Temperature
(F), humidity (%). These <inputs>
elements uses type=“numbers”
(min, max, step).
Gulf of Evaluation  
System Constraint  
Ingesting sensor values after clicking
"Record Reading"
E.g. Water pH Boundaries (0.0 <= pH <=
14.0)
How does the system immediately
communicate whether the input given
is in a normal, warning, or hazard
state?
ANS: the js file will have
if-statements to check if the
numbers are in specific ranges to
see if the conditions are ideal,
critical, optimal, or warning
What attributes and validation
conditions prevent impossible
scientific values from entering state?\*
See hint after this table.
ANS: The value that will be the
constraint of this min: “0”, max=
“14”, step= “0.1”
Visual Feedback
State
Error Recovery  
Real-Time Input Error / Out-of-Bounds  
Accidental or test data submissions  
Section 4.3 tree (rough idea might change it later)
index.html

<header> (text -align center, Static) 
<div class=”logo”> 
<main> 
<section class= query updates> (dynamic) 
What visual property or class change 
alerts the user that a typed number is 
dangerous/wrong before submission? 
ANS: js builtin features for out of 
bounds inputs and also html 
required fields. 
What affordance exists to clear bad 
records or accidental inputs from the 
active queue? 
ANS: Clear button will allow for 
accidental inputs to be 
disregarded with just one click. 
< btn btn-clear-all> Clear All items (Event: click, static) 
<div  id="log-container" class="log-container"> 
( display:flex, flex-direction:column gap, dynamic) 
(js in here) 
<p> nothing in the queue…. 
<section class= “log-ins”> (CSS: display:flex flex-direction: column space between) 
<h2> Login in  (STATIC) 
<label> pH 
<input id="ph-input" type="number" min="0" max="14" step="0.1" required 
placeholder=” e.g. 12” 
<label> Electrical Conductivity 
<input id="ec-input" type="number" min="0" max="150"  required 
placeholder=” e.g. 120” 
<label> Air Temperature 
<input id="ph-input" type="number" min="0" max="14" required placeholder=” 
e.g. 67” 
e.g. 122” 
<label> Relative Humidity 
<input id="ph-input" type="number" min="0" max="14" required placeholder=” 
<btn id=”btn-submit”> Submit (event handling, transitions, hovers, static) 
<footer class=”section-footer”> (text align, center. margin -top) 
<p> Agriculture system 
Section 4.4 data schema 
const checkSchema = { 
id: "String",          
having a unique id for each testcase 
ph: "Number",       
ec: "Number",        
number for pH 
number for ec 
temp: "Number",    number for temperature 
rh: "Number",         
number for humidity 
status: "String"       
} 
optimal , warning, or critical
