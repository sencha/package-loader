Ext.define('Ext.Package', {
    requires: [
        'Ext.package.Entry'
    ],

    singleton: true,

    _entryMap: {},
    _usesMap: null,
    _packagesMap: null,

    _loadQueue: [],
    _loading: false,
    
    getPackages: function() {
        var map = this._packagesMap;
        if (!map) {
            map = Ext.manifest && Ext.manifest.packages;
            map = map || {};
            this._packagesMap = map;
        }
        return map;
    },
    
    _queue: function(entry) {
        var me = this,
            reqs, req, r, i;
        
        if (!entry.queued && !entry.loaded) {
            entry.queued = true;
            reqs = entry.getRequires();
            for (i = 0; i < reqs.length; i++) {
                req = reqs[i];
                r = me.getEntry(req);
                me._queue(r);
            }
            me._loadQueue.push(entry);
        }
        
        return entry;
    },
    
    load: function (pkgName) {
        var me = this,
            entry;
        
        if (!me.getPackages()[pkgName]) {
            return Ext.Promise.reject(
                new Error('Cannot load package "' + pkgName + '"'));
        }

        entry = me.getEntry(pkgName);
        me._queue(entry);
        if (!me._loading) {
            me._advance();
        }
        
        return entry.promise;
    },

    _advance: function() {
        var me = this,
            queue = me._loadQueue,
            next = queue.shift();
        if (next) {
            me._loading = true;
            next.beginLoad();
            next.promise.then(function () {
                me._advance();
            }, function () {
                me._advance();
            });
        }
        else {
            me._loading = false;
        }
    },

    loadAllScripts: function (packageName, scripts) {
        var me = this,
            entry = me.getEntry(packageName);
        entry.load(scripts);
    },

    getEntry: function (pkgName) {
        var entryMap = this._entryMap,
            entry = entryMap[pkgName];

        if (!entry) {
            entryMap[pkgName] = entry = new Ext.package.Entry(pkgName);
            var metadata = this.getPackages()[pkgName];
            if (metadata) {
                entry.metadata = metadata;
            }
        }

        return entry;
    },

    isLoaded: function (name) {
        return this.getEntry(name).loaded;
    }
});
