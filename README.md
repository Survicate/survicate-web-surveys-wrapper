This package is a wrapper which allows you to install the Survicate tracking code and use API methods directly in your code.
It's built on top of [Preact](https://github.com/preactjs/preact) using [Typescript](https://github.com/Microsoft/TypeScript)

# Installation

`npm install @survicate/survicate-web-public-package --save`

# Initialization

Find your workspace key in the [Survicate Panel](https://panel.survicate.com/o/0/w/0/settings/access-keys).

Initialize Survicate using `initSurvicate`

**Please note:** *`initSurvicate` is asynchronous, so the user has to await its resolution. This should be done once. Handling asynchronous code depends on the use case.*


```javascript
import { initSurvicate, getSurvicateInstance, ApiEvent } from '@survicate/survicate-web-public-package/widget_wrapper';

  const config = { workspaceKey: 'workspace key' };

  await initSurvicate(config).then(() => {
    const survicate = getSurvicateInstance();
    survicate.addEventListener(ApiEvent.questionAnswered, () => console.log('questionAnswered'));
  })

```

To define user attributes on Survicate initialization, pass it to `initSurvicate`

```javascript
const config = { workspaceKey: 'workspace key', traits: { name: 'John Doe', email: 'doe@john.com'} };

await initSurvicate(config);

```
<br/>

## Examples:

Usage in React:

```jsx
//Main component
import { getSurvicateInstance, initSurvicate } from '@survicate/survicate-web-public-package/widget_wrapper';
import { Survicate } from '@survicate/survicate-web-public-package';

function App() {
  const [survicate, setSurvicate] = useState<Survicate | null>(null);

  useEffect(() => {
    initSurvicate({ workspaceKey: 'workspace key' }).then(() => {
      setSurvicate(getSurvicateInstance());
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ChildComponent survicate={ survicate }/>
      </header>
    </div>
  );
}

export default App;

//Child component
import { Survicate } from '@survicate/survicate-web-public-package';
import { ApiEvent } from '@survicate/survicate-web-public-package/widget_wrapper';

interface Props {
  survicate: Survicate | null;
}

export const ChildComponent = ({survicate}: Props ) => {

useEffect(() => {
  if (!survicate) {
    return
  }

  survicate.addEventListener(ApiEvent.questionAnswered, () => console.log('questionAnswered'))
}, [survicate])

  return (
    <div>
      <h1>ChildComponent</h1>
    </div>
  )
}

```
<br/>

To call available methods:

```jsx
import  { getSurvicateInstance , ApiEvent } from '@survicate/survicate-web-public-package/widget_wrapper';

//Initialize survicate, then use:
const survicate = getSurvicateInstance();

// Show survey with force option
survicate.showSurvey('9d4f6e44ddabb6fe', { forceDisplay: true });

// Set user attributes
survicate.setVisitorTraits({newName: 'newName', newEmail: 'newEmail'});

// Add event listener
survicate.addEventListener(ApiEvent.questionAnswered , () => console.log('question answered'));

// Remove eventListener
survicate.removeEventListener(ApiEvent.questionAnswered);

```
*Please refer to the [documentation](https://developers.survicate.com/javascript/methods/) for the rest of the methods.*
