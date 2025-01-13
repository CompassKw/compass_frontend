declare interface Trip {
  id: number;
  title: string;
  sharing_price: string;
  single_price: string;
  start_date: string;
  end_date: string;
  number_of_days: number;
  trip_start: string;
  trip_end: string;
  the_price_includes: string;
  the_price_does_not_include: string;
  andventures_and_site_that_will_be_covered: string;
  accommodation_type: string;
  level_of_difficulty: string;
  theme: string;
  itinerary: string[];
  is_private: number;
  is_trending: number;
  guide: string;
  country: Country;
  month: Month;
  continent: Continent;
  image_link: string;
  gallery: string[];
  chat_url: string;
}
