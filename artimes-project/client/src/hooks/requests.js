const API_URL = 'http://localhost:8000';
async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);

  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);

  const data = await response.json();

  return data.sort((a, b) => a.flightNUmber - b.flightNUmber);

  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {}
  return {
    ok: false,
  };
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {
    return fetch(`${API_URL}/launches/${id}`,{
      method:'delete'
    })
  }catch (e) {
    console.log(e);
    return {
      ok:false
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
