export interface Place {
    name: String;
    display_phone: String;
    address1: String;
    is_closed: String;
    rating: String;
    review_count: String;
    latitude: Number;    
    longitude: Number;
}

export interface ticketMaster {
    name?: String,
    date?: String,
    venue?: String,
    postalCode?: String,
    city?: String,
    category?: String
}

export interface location{
    latitude?:number,
    longitude?:number
}

export interface charts {
    eventname?: String,
    ratings?: Number
}

export interface reviewCharts{
    eventname?: String,
    reviews?: Number
}

export interface stubHub {
    name?: String,
    date?: String,
    venue?: String,
    city?: String,
    postalCode?: String,
    category?: String
}

export interface viewUserReviewRating {
    eventname?: String,
    reviews?: String,
    ratings?: Number
}

export interface editReviewRating {
    eventname?: String,
    reviews?: String,
    ratings?: Number
}

export interface viewDetails {
    username?: String,
    eventname?: String,
    reviews?: String,
    ratings?: Number
}

