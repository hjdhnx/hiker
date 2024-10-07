Object(g.useEffect)((function() {
        var A;
        (A = t.enterprise.globalKey,
            M("/api/user/" + A + "/shared-depots")).then((function(A) {
                var e = A.data;
                I(e.depots.sort((function(A, e) {
                        return e.lastCommitTime - A.lastCommitTime
                    }
                )))
            }
        )).finally((function() {
                return f(!1)
            }
        ))
    }
), [])