
function Arc(settings) {
    Object.assign(this, {
        
        max: Infinity,

        min: -Infinity,

        span: 0.0, // % 1.0

        ...settings
    });
}

function fit(all = [new Arc()], error = 1/1000) {

    const {max} = Math,

    round = el => Math.round(el/error) * error,

    sum = arcs => arcs.reduce((re, {span}) => 
        re + span
    , 0);

    let arcs = all.filter(({span, min}) =>
        
        max(0, round(span) || round(min))

    ).sort((a, b, order = ({span, max, min}) => 

        span < min? min - span:

        span > max? max - span:

            Infinity

    ) => order(a) - order(b));

    const bound = re => {

        let i = re.findIndex(arc => 

            ['max', 'min'].find((bound, i) => 

                isFinite(max(0, round((

                    arc.span - arc[bound]
                
                ) * (i || -1)))? void (0):

                    arc.span = arc[bound]

                ) && i === 1
            )
        );
        if (i === -1) return re;

        re[i] = gap;

        countdown--;

        return re
    },
    gap = new Arc();
    
    let offsets = countdown = arcs.length;

    while(round(offsets) * countdown) {

        arcs = bound(arcs);

        let one = sum(all);

        offsets = 1 - one;

        let add = max(offsets, 0),

        fit = one/(1 + (

            add && add/sum(arcs)
        ));
        arcs.forEach(arc => 

            arc.span /= fit
        );
    }
    return all
}

/* 
fit([{min: 1/2, span: 1/4},
    {max: 0.25, span: 1/4},
    {min: 0.38, span: 1/4},
    {span: 1/4}
].map(el => new Arc(el)))

*/
