export function calculateDistributionData(positions) {
    const initialReduction = {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 0,
        bottomRight: 0
    };

    const mid = 250;

    const distribution = positions.reduce((reduction, position) => {
        const bottom = position.y > mid;
        const right = position.x > mid;
        if (bottom && right) {
            reduction.bottomRight++;
        }
        if (!bottom && right) {
            reduction.topRight++;
        }
        if (bottom && !right) {
            reduction.bottomLeft++;
        }
        if (!bottom && !right) {
            reduction.topLeft++;
        }
        return reduction;
    }, initialReduction);

    const data = [
        {
            "label": "Top Right",
            "value": distribution.topRight
        },
        {
            "label": "Top Left",
            "value": distribution.topLeft
        },
        {
            "label": "Bottom Right",
            "value": distribution.bottomRight
        },
        {
            "label": "Bottom Left",
            "value": distribution.bottomLeft
        }
    ];
    return data;
}
