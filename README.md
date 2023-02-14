# Node Js Complete Guide

##           

### 027 DELETE launches Aborting Launches 1

adding the abort launch route

📂 artimes-project\server\src\routes\launches\launches.router.js

```javascript
import { Router } from 'express';
import { httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch } from './launches.controller.js';

const launchesRouter = Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
// this is the abort route
launchesRouter.delete('/:id', httpDeleteLaunch)
export { launchesRouter };

```

let's create the `httpDeleteLaunch`

📂 artimes-project\server\src\routes\launches\launches.controller.js

```javascript
import { getAllLaunches, addNewLaunch, isLaunchExists } from '../../models/launches.model.js';

function httpDeleteLaunch(req, res) {
  const id = req.params.id;
  if (!isLaunchExists(id)) {
    return res.status(404).json({
      error: 'Launch Not Found'
    })
  }
  return res.status(200).json(aborted)
}

export { httpGetAllLaunches, httpAddNewLaunch, httpDeleteLaunch };
```

here we are using `isLaunchExists` method from the modal

📂 artimes-project\server\src\models\launches.model.js

```javascript
function isLaunchExists(id) {
  return launches.has(id)
}
```

let's wire up the frontend logic

📂 artimes-project\client\src\hooks\requests.js

```javascript
async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {
    return fetch(`${API_URL}/launches/${id}`, {
      method: 'delete'
    })
  } catch (e) {
    console.log(e);
    return {
      ok: false
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
```

and the request as well

📂 artimes-project\client\src\hooks\useLaunches.js

```javascript
const abortLaunch = useCallback(
  async (id) => {
    const response = await httpAbortLaunch(id);

    // here we are checking the respose.ok 
    const success = response.ok;
    if (success) {
      getLaunches();
      onAbortSound();
    } else {
      onFailureSound();
    }
  },
  [getLaunches, onAbortSound, onFailureSound]
);
```

### 028 DELETE launches Aborting Launches 2

let's add the `abortLaunchById` function

📂 artimes-project\server\src\models\launches.model.js

```javascript
function abortLaunchById(id) {
  const launch = launches.get(id);
  launch.upcoming = false;
  launch.success = false;
  return launch;
}

export { getAllLaunches, addNewLaunch, isLaunchExists, abortLaunchById };
```

let's add a handleClick method for the remove button

📂 artimes-project\client\src\pages\Upcoming.js

```javascript
  // handle click method
const handleClick = (flightNumber) => {
  console.log('flightNumber', flightNumber);
  abortLaunch(flightNumber);
};
const tableBody = useMemo(() => {
  return launches
    ?.filter((launch) => launch.upcoming)
    .map((launch) => {
      return (
        <tr key={String(launch.flightNUmber)}>
          <td>
            <Clickable style={{ color: 'red' }}>
              <Link
                className={classes.link}
                onClick={() => handleClick(launch.flightNUmber)}
              >
                ✖
              </Link>
            </Clickable>
```
