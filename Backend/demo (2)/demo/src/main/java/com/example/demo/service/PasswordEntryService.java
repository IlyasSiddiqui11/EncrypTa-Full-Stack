package com.example.demo.service;

import com.example.demo.model.PasswordEntry;
import com.example.demo.util.AESUtil;
import com.example.demo.repository.PasswordEntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordEntryService {

    @Autowired
    private PasswordEntryRepo repository;

    public PasswordEntry addPassword(PasswordEntry entry){

        String encryptedPassword = AESUtil.encrypt(entry.getPassword());
        entry.setPassword(encryptedPassword);

        PasswordEntry saved = repository.save(entry);

        // decrypt before sending to frontend
        saved.setPassword(AESUtil.decrypt(saved.getPassword()));

        return saved;
    }


    public List<PasswordEntry> getAllPasswords(){

        List<PasswordEntry> list = repository.findAll();

        for(PasswordEntry entry : list){
            String decrypted = AESUtil.decrypt(entry.getPassword());
            entry.setPassword(decrypted);
        }

        return list;
    }

    public void deletePassword(Long id){
        repository.deleteById(id);
    }

    public PasswordEntry updatePassword(Long id, PasswordEntry updated){

        PasswordEntry entry = repository.findById(id).orElse(null);

        if(entry != null){

            entry.setWebsite(updated.getWebsite());
            entry.setUsername(updated.getUsername());

            String encrypted = AESUtil.encrypt(updated.getPassword());
            entry.setPassword(encrypted);

            PasswordEntry saved = repository.save(entry);

            // decrypt before returning
            saved.setPassword(AESUtil.decrypt(saved.getPassword()));

            return saved;
        }

        return null;
    }


    public List<PasswordEntry> getPasswordsByUser(Long userId){

        List<PasswordEntry> entries = repository.findByUserId(userId);

        for(PasswordEntry entry : entries){
            String decrypted = AESUtil.decrypt(entry.getPassword());
            entry.setPassword(decrypted);
        }

        return entries;
    }
}