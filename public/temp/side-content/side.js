import Map from '../map/map.js';
import {getLocationWithinBound} from '../api/locations.js';

export default class Side {
    constructor (rootElement) {
        if (!rootElement) {
            throw 'rootElement required so we know where we render the element';
        }
        this.rootElement = rootElement;
    }

    renderOverview(locationOverview) {
        return `
            <div class="locationOverview">

            </div>`
    }

    renderContact(locationContact) {
        return `
            <div class="locationContact">

            </div>`
    }

    renderReviews(locationReviews) {
        return `
            <div class="locationReviews">

            </div>`
    }

    renderLocationTags(tags) {
        return `
            <div class="locationTags">
            
            </div>
        `
    }

    async getLocationsInView() {
        const bound = Map.getLocation();
        const locations = await (getLocationWithinBound(bound)).locations;
        let res = '';
        let idx = 0;

        for (let location of locations) {
            res += `
            <div class="location">
                <div class="locationImage">
                    <img src='${location.imgSrc}' alt='${location.imgAlt}'>
                <div/>
                <div class="locationTitle">
                    <p>${location.title}</p>
                </div>
                <div class="locationPrice">
                    <div class="locationAddress">
                        <i />
                        <p>${location.address}</p>
                    </div>
                    <div class="locationPrice">
                        <span>
                            <i />
                            ${location.price}
                            <i />
                            /
                            ${location.time}
                        </span>
                    </div>
                </div>
                <div class="locationInfoCnt">
                    <a class="OvReCo_btn txt_btn" href="#overvieew${idx}">
                        Overview
                    </a>
                    <a class="OvReCo_btn txt_btn" href="#contact${idx}">
                        Contact
                    </a>
                    <a class="OvReCo_btn txt_btn" href="#reviews${idx}">
                        Reviews
                    </a>
                </div>
                <div class="locationTags>
                    ${this.renderLocationTags(location.tags)}
                </div>
                <div class="locationInfo" id="overvieew${idx}">
                    ${this.renderOverview(location.overview)}
                    ${this.renderContact(location.contact)}
                    ${this.renderReviews(location.reviews)}
                </div>
            </div>`
        }

    }
    render() {
        this.rootElement.innerHTML = `<div id="content-wrapper">
            ${this.getLocationsInView()}
        </div>`
    }
}