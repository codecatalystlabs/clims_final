import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createHotspot, getHotspots } from '../apiRequests';

const useHotspots = () => {
    const queryClient = useQueryClient();
    const hotspotQuery = useQuery(['hotspot'], getHotspots);

    const createHotspotMutation = useMutation(createHotspot, {
        onSuccess: (data) => {
            queryClient.setQueryData(['hotspot'], data);
            queryClient.invalidateQueries(['hotspot']);
        },
    });

    return {
        hotspotQuery,
        createHotspotMutation,
    };
};

export default useHotspots;
