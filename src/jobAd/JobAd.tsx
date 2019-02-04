import React from 'react'

import './jobAd.css'

import {
    Card,
    Image,
    CardContent,
    Media,
    Button,
    MediaContent,
    Content,
    Title,
    Subtitle,
} from 'bloomer'

export interface Company {
    name:       string
    website:    string
    slug:       string
    logo:       string
    descr:      string
    id:         number
    cover:      string
    industry:   string
}

export interface Contact {
    photo:      string
    phone:      string
    name:       string
    email:      string
}

export interface Location2 {
    text:           string
    area_2:         string
    area_1:         string
    area_2_short:   string
    url:            string
    area_1_short:   string
    country:        string
    place_id:       string
    city_short:     string
    country_short:  string
    city:           string
}

export interface Location {
    location: Location2
}

export interface Urls {
    apply:  string
    ad:     string
}

export interface JobAdProps {
    id:                 number
    categories:         any[]
    company:            Company
    contact:            Contact
    departments:        any[]
    title:              string
    slug:               string
    descr:              string
    skills:             string
    function:           string
    experience:         string
    employment_type:    string
    from_date:          string
    to_date?:           any
    language:           string
    locations:          Location[]
    urls:               Urls
}

const JobAd: React.SFC<JobAdProps> = props => (
    <Card className='job-ad'>
        <CardContent>
            <Media>
                <div className='thumbnail'>
                    <Image isSize='48x48' src={props.company.logo} />
                </div>

                <MediaContent>
                    <Title isSize={6}>{props.title}</Title>

                    <Subtitle isSize={6}>
                        {props.locations.map(location => location.location.text)}
                    </Subtitle>
                </MediaContent>
            </Media>

            <Content>
                <ul className='ad-details'>
                    <li>
                        <strong>Company: </strong>
                        <a href={props.company.website} target='_blank'>{props.company.name}</a>
                    </li>
                    <li>
                        <strong>Function: </strong>
                        {props.function}
                    </li>
                    <li>
                        <strong>Experience: </strong>
                        {props.experience}
                    </li>
                    <li>
                        <strong>Type: </strong>
                        {props.employment_type}
                    </li>
                </ul>
            </Content>

            <Button isColor='primary' href={props.urls.ad} target='_blank'>
                I'm interested!
            </Button>
        </CardContent>
    </Card>
)

export default JobAd
