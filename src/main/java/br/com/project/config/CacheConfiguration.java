package br.com.project.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, br.com.project.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, br.com.project.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, br.com.project.domain.User.class.getName());
            createCache(cm, br.com.project.domain.Authority.class.getName());
            createCache(cm, br.com.project.domain.User.class.getName() + ".authorities");
            createCache(cm, br.com.project.domain.Student.class.getName());
            createCache(cm, br.com.project.domain.Student.class.getName() + ".grades");
            createCache(cm, br.com.project.domain.Student.class.getName() + ".schoolClasses");
            createCache(cm, br.com.project.domain.Student.class.getName() + ".histories");
            createCache(cm, br.com.project.domain.SchoolClass.class.getName());
            createCache(cm, br.com.project.domain.SchoolClass.class.getName() + ".subjects");
            createCache(cm, br.com.project.domain.SchoolClass.class.getName() + ".students");
            createCache(cm, br.com.project.domain.Teacher.class.getName());
            createCache(cm, br.com.project.domain.Teacher.class.getName() + ".schoolClasses");
            createCache(cm, br.com.project.domain.Subject.class.getName());
            createCache(cm, br.com.project.domain.Grade.class.getName());
            createCache(cm, br.com.project.domain.History.class.getName());
            createCache(cm, br.com.project.domain.History.class.getName() + ".students");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
