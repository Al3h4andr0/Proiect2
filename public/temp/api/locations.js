const rootAPI = `${location.href}/api/locations/bound`;


export const getLocationWithinBound = async (bound) => {
    try {
        let locations =  await fetch(rootAPI, {method: 'GET'})
        locations = await locations.json();
        return locations;
    } catch (e) {
        throw e;
    }
}