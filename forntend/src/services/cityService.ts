import axios from 'axios';

const CITY_API_URL = 'https://data.gov.il/api/action/datastore_search?resource_id=b7cf8f14-64a2-4b33-8d4b-edb286fdbd37&limit=1500';

interface CityRecord {
    _id: number;
    שם_ישוב: string;
    שם_ישוב_לועזי: string;
    // Add other fields if needed, but we mainly need the name
}

interface ApiResponse {
    success: boolean;
    result: {
        records: CityRecord[];
    };
}

export const fetchCities = async (): Promise<string[]> => {
    try {
        const response = await axios.get<ApiResponse>(CITY_API_URL);
        if (response.data.success) {
            // Trim whitespace and filter out empty names if any
            return response.data.result.records
                .map(record => record.שם_ישוב.trim())
                .filter(name => name.length > 0)
                .sort();
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch cities:", error);
        return [];
    }
};
